import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';

import { EditComponent } from './pages/edit/edit.component';
import { MatSelectionList } from '@angular/material/list';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { User } from 'src/app/interfaces/user';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, CrudInterface, ActionDialogInterface {

  isLoading = true;

  constructor(
    private userService: UserService,
    public dialogEditUser: MatDialog,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private showMessage: ShowMessageService,
  ) { }



  ngOnInit(): void {
    this.readCRUD()
  }

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<User>();

  selection = new SelectionModel<User>(true, []);

  clickedRows = new Set<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    //console.log(numSelected, numRows);
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    //console.log(this.selection.selected)
    if (!row) {
      //console.log(`${this.isAllSelected() ? 'deselect' : 'select'} all`);
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    } else {
      //return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
      //console.log(`${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.ID}`)
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

  }



  /*************** PARA CARGAR LOS MODALES************ */
  /*EL modal para agregar */
  openDialogAdd(): boolean {
    const dialogRef = this.dialogEditUser.open(EditComponent, {
      /*maxWidth: '100vw',
       maxHeight: '100vh',
       height: '100%',
       width: '100%',*/


      panelClass: 'dialog',
      data: {
        row: {},
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addUserWithPerson(result);
      }
    });
    return true
  }
/*EL modal para actualizar */
  openDialogUpd(): boolean {
    /*obtenemos todos los selecionados */
    let ids = this.selection.selected.reduce((a: number[], b: User) => (b.id == null) ? a : [...a, b.id], [])
    /*obtenemos el usuario de la primera posicion */
    let userSelected: User = this.selection.selected.filter(o => o.id == ids[0])[0];
    /*abrimos el dialogo */
    const dialogRef = this.dialogEditUser.open(EditComponent, {
      panelClass: 'dialog',
      data: {
        row: userSelected, /**el usuario seleccionado como parametro */
        type: TYPES_ACTIONS_DIALOG.UPD /*indicamos que el modal va ser ACTUALIZACION */
      }
    });

    dialogRef.afterClosed().subscribe((result) => { /*UNA VEZ QUE SE CIERRA EL MODAL SE EJECUTA ESTE METODO */
    /*VERIFICAMOS QUE HAYA DEVUELTO UN USUARIO Y LUEGO EJECUTAMOS EL UPDATE */
    if (result) {
        this.updUserWithPerson(result)
      }
    });
    return false;
  }

  openDialogdAddAndUpd(object: any): boolean {
    return false;
  }



  /*************** CRUD CON BASE DE DATOS************ */

  del() {
    let ids = this.selection.selected.reduce((a: number[], b: User) => (b.id == null) ? a : [...a, b.id], [])
    console.log(ids)
    this.userService.del(ids)?.subscribe
  }

  createCRUD(object: any): boolean {
    return false;
  }

  /*para cargar a la tabla*/
  readCRUD(): boolean {
    this.isLoading = true;
    this.userService.all()?.subscribe({
      next: data => {
        console.log(data);
        this.dataSource.data = data;
        this.isLoading = false

      },
      error: error => {
        this.isLoading = false
      }

    })
    return false;
  }
  deleteCRUD(ids: string | number | string[] | number[] | null): boolean {
    return false
  }
  updateCRUD(id: string | number | null, object: any): boolean {
    return false;
  }

  changeState(id: number[], state: number/*1=activo, 2=inactivo */) {

  }

  delete(id: number[]) {

  }

  /*Crud services */
  /**Para añadir usuario  */
  addUserWithPerson(user: User): boolean {
    this.userService.addUserWithPerson(user).subscribe({
      next: data => {
        /**mostramos un mensaje de exito */
        this.showMessage.success({ message: data.msg });
        /*obtenemos el ultimo usuario devuelvto por el backend y que viene en data */
        const users = data.data as User[]
        /*El nuevo usuario lo añadimos a la primera fila de la tabla */
        this.dataSource.data.unshift(...users)
        /**actualizamops paginator */
        this.paginator._changePageSize(this.paginator.pageSize)


      },
      error: error => {
        /**Mostramos un mensaje de error y pasamos una funcion para reintenar nuevamente añdir el usuario  */
        this.showMessage.error({ message: error.error.message, action: () => this.addUserWithPerson(user) })
      }
    });
    return true
  }

  updUserWithPerson(user: User): boolean {
    this.userService.updUserWithPerson(user).subscribe({
      next: data => {
        this.showMessage.success({ message: data.msg });
        const users = data.data as User[];
        /*obtenemos la posicion del usuario en la tabla */
        const objIndex = this.dataSource.data.findIndex((obj => obj.id == users[0].id));
        /*reemplazamos el usuario anterior por el actual  */
        this.dataSource.data[objIndex] = users[0]/*el backend retorna un array con un solo usuario, es por que en el backend se utiliza un where y piensa que habra mas una coincidencia */
        this.selection.clear() /*actualiza la seleccion  */
        this.paginator._changePageSize(this.paginator.pageSize)/*y actualizamos el paginator */
      },
      error: error => {
        this.showMessage.error({ message: error.error.message, action: () => this.updUserWithPerson(user)  })
      }
    });
    return true
  }

}



