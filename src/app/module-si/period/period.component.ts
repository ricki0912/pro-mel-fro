



import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Period } from 'src/app/interfaces/period';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';

import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './pages/edit/edit.component';
//import { EditVideoComponent } from './pages/edit-video/edit-video.component';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { PeriodService } from 'src/app/services/period.service';
import { FindPeriodComponent } from './pages/find-period/find-period.component';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit, CrudInterface, ActionDialogInterface {
  isLoading = true;

  constructor(
    private periodService: PeriodService,
    public dialogEditVideo: MatDialog,
    private showMessage: ShowMessageService
  ) { }

  ngOnInit(): void {
    this.readCRUD();
  }

  displayedColumns: string[] = ['select','nombres', 'link', 'state'];
  dataSource = new MatTableDataSource<Period>();
  selection = new SelectionModel<Period>(true, []);

  clickedRows = new Set<Period>();

  //para el paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
  checkboxLabel(row?: Period): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.prdsId}`;
  }

  //CRUD
  createCRUD(object: any): boolean {
    throw new Error('Method not implemented.');
  }

  readCRUD(): boolean {
    this.isLoading = true;
    this.periodService.all().subscribe({
      next: data => {
        this.dataSource.data = data.data as Period[];
        this.isLoading = false
      },
      error: error => {
        this.isLoading = false
      }
    })
    return false;
  }

  updateCRUD(object: any, id: string | number | null): boolean {
    throw new Error('Method not implemented.');
  }

  openDialogChoosePeriod() {
    const dialogRef = this.dialogEditVideo.open(FindPeriodComponent, {
      panelClass: 'dialog',
      data: {
        row: null,
        type: TYPES_ACTIONS_DIALOG.ADD,
        hqId: 0
      }
    });
    dialogRef.afterClosed().subscribe((result: Period) => {
      if (result) {
        console.log("Seleccionare Periodo",result)
      }
    });
  }

  openDialogAdd(): boolean {
    const dialogRef = this.dialogEditVideo.open(EditComponent, {
      panelClass: 'dialog',
      data: {
        row: {},
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addPeriod(result);
      }
    });
    return true
  }
  openDialogUpd(): boolean {
    let ids = this.selection.selected.reduce((a: number[], b: Period) => (b.prdsId == null) ? a : [...a, b.prdsId], [])
    let periodSelected : Period = this.selection.selected.filter(o => o.prdsId == ids[0])[0];
    const dialogRef = this.dialogEditVideo.open(EditComponent, {
      panelClass: 'dialog',
      data: {
        row: periodSelected,
        type: TYPES_ACTIONS_DIALOG.UPD
      }
    });

    dialogRef.afterClosed().subscribe((result:Period) => {
      if(result) {
        this.updPeriod(result, result.prdsId || -1);
      }
    });
    return false;
  }

  openDialogdAddAndUpd(object: any): boolean {
    throw new Error('Method not implemented.');
  }

  //FUNCIONES
  addPeriod(videos: Period): boolean {
    this.periodService.add(videos).subscribe({
      next: data => {
        /**mostramos un mensaje de exito */
        this.showMessage.success({ message: data.msg });
        /*obtenemos el ultimo business devuelto por el backend y que viene en data */
        const videos = data.data as Period[]

        /*El nuevo usuario lo añadimos a la primera fila de la tabla */
        this.dataSource.data.unshift(...videos);
        this.selection.clear();
        /**actualizamops paginator */
        this.paginator._changePageSize(this.paginator.pageSize)
      },
      error: error => {
        /**Mostramos un mensaje de error y pasamos una funcion para reintenar nuevamente añdir el usuario  */
        this.showMessage.error({ message: error.error.message, action: () => this.addPeriod(videos) })
      }
    });
    return true;
  }

  updPeriod(period: Period, prdsId:number): boolean {
    this.periodService.upd(period, prdsId).subscribe({
      next: data => {

        this.showMessage.success({ message: data.msg });
        const p = data.data as Period[];
        const objIndex = this.dataSource.data.findIndex((obj => obj.prdsId == p[0].prdsId));
        this.dataSource.data[objIndex] = p[0];
        this.selection.clear();
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      error: error => {
        this.showMessage.error({ message: error.error.message, action: () => this.updPeriod(period, prdsId) });
      }
    });
    return true;
  }

  delPeriod(){
    let ids = this.selection.selected.reduce((a: number[], b: Period) => (b.prdsId == null) ? a : [...a, b.prdsId], []);
    this.wantDelete(()=>this.deleteCRUD(ids))

  }

  wantDelete(d:()=>void){
    this.dialogEditVideo
      .open(DialogConfirmationComponent, {
        data: `Esta seguro que desea Eliminar.`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          d();
        } else {

        }
      });
  }

  deleteCRUD(ids: number[]): boolean {
    this.periodService.dels(ids).subscribe({
      next: data=>{
        this.showMessage.success({message: data.msg});
        this.readCRUD();
        this.selection.clear();
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      error: error=>{
        this.showMessage.error({message: error.error.message})
      }
    })
    return true;
  }

  changeState(prdsId: number, prdsState:number):boolean{
    this.periodService.changeState(prdsId, prdsState).subscribe({
      next: data=>{
        this.showMessage.success({message: data.msg});
        this.readCRUD();
        this.selection.clear();
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      error: error=>{
        this.showMessage.error({message: error.error.message})
      }
    })
    return true;
  }


}
