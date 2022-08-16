import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/services/category.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { MatDialog } from '@angular/material/dialog';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { Headquarter } from 'src/app/interfaces/headquarter';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { EditComponent } from './pages/edit/edit.component';


@Component({
  selector: 'app-headquarters',
  templateUrl: './headquarters.component.html',
  styleUrls: ['./headquarters.component.scss']
})
export class HeadquartersComponent implements OnInit {

  isLoading: boolean = false
  /*Combo box */
  headquarters: Headquarter[] = []



  displayedColumns: string[] = ['select', 'position', 'name', 'RUC','tel', 'email', 'address']
  dataSource = new MatTableDataSource<Headquarter>();
  selection = new SelectionModel<Headquarter>(true, []);

  constructor(
    private headquarterService: HeadquarterService,
    private dialog: MatDialog,
    private showMessage: ShowMessageService

  ) { }

  ngOnInit(): void {
    this.readHeadquarters();
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
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
  checkboxLabel(row?: Headquarter): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.hqId}`;
  }

  /*Open modal */
  openDialogAdd(): boolean {
    const dialogRef = this.dialog.open(EditComponent, {
      panelClass: 'dialog',
      data: {
        row: null,
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });
    dialogRef.afterClosed().subscribe((result: Headquarter) => {
      if (result) {
        this.createCRUD(result)
      }
    });
    return false;
  }




  openDialogUpd(): boolean {
    let ids = this.selection.selected.reduce((a: number[], b: Headquarter) => (b.hqId == null) ? a : [...a, b.hqId], [])
    /*obtenemos el usuario de la primera posicion */
    let data: Headquarter = this.selection.selected.filter(o => o.hqId == ids[0])[0];
    /*abrimos el dialogo */
    const dialogRef = this.dialog.open(EditComponent, {
      panelClass: 'dialog',
      data: {
        row: data,
        type: TYPES_ACTIONS_DIALOG.UPD
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCRUD(result);
      }
    });
    return false;
    return false;
  }
  /*CRUD */
  private readHeadquarters() {
    this.isLoading=true;
    this.headquarterService.all().subscribe({
      next: d => {
        this.dataSource.data = d.data as Headquarter[];
        this.isLoading=false;
      },
      error: e => {
        
      }
    })
  }

  private createCRUD(object: Headquarter): boolean {
    this.headquarterService.add(object).subscribe({
      next: data => {
        //this.readCRUD()
        const t = data.data as Headquarter[]
        console.log("Sede agregada",t)
        this.dataSource.data.unshift(...t)
         
        this.selection.clear() /*actualiza la seleccion  */
        this.readHeadquarters()
        this.showMessage.success({ message: data.msg })
      },
      error: error => {
        this.showMessage.error({ message: error.error.message, action: () => this.createCRUD(object) })
      }
    })

    return true;
  }
  private updateCRUD(object: Headquarter): boolean {
    this.headquarterService.upd(object).subscribe({
      next: data => {
        const hqs = data.data as Headquarter[]


        const objIndex = this.dataSource.data.findIndex((obj => obj.hqId == hqs[0].hqId));
        /*reemplazamos el usuario anterior por el actual  */
        this.dataSource.data[objIndex] = hqs[0]/*el backend retorna un array con un solo usuario, es por que en el backend se utiliza un where y piensa que habra mas una coincidencia */
        this.selection.clear() /*actualiza la seleccion  */


        this.readHeadquarters()

        //this.teller=teller[0];
        this.showMessage.success({ message: data.msg })
      },
      error: error => {
        this.showMessage.error({ message: error.error.message, action: () => this.updateCRUD(object) })
      }
    })

    return true;
  }

  beforeDelete() {
    let ids = this.selection.selected.reduce((a: number[], b: Headquarter) => (b.hqId == null) ? a : [...a, b.hqId], [])
    /*obtenemos el usuario de la primera posicion */
    let data: Headquarter = this.selection.selected.filter(o => o.hqId == ids[0])[0];

    this.wantDelete(() => this.deleteCRUD(data.hqId || -1))
  }
  private wantDelete(d: () => void) {
    this.dialog
      .open(DialogConfirmationComponent, {
        data: `Esta seguro que desea eliminar.`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          d();
        } else {

        }
      });
  }
  private deleteCRUD(id: number): boolean {
    this.headquarterService.del(id).subscribe({
      next: data => {
        this.showMessage.success({ message: data.msg });
        this.readHeadquarters();
        this.selection.clear() /*actualiza la seleccion  */

      },
      error: error => {
        this.showMessage.error({ message: error.error.message })
      }
    })
    return true;
  }
}
