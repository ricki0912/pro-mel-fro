import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { CrudInterface } from 'src/app/global/interfaces/crud.interface';

import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './pages/edit/edit.component';
//import { EditVideoComponent } from './pages/edit-video/edit-video.component';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import {PaymentMethodService} from 'src/app/services/payment-method.service'
import {PaymentMethod} from 'src/app/interfaces/payment-method'
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
//import { PeriodService } from 'src/app/services/period.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit, CrudInterface, ActionDialogInterface {
  isLoading = true;

  constructor(
    private paymentMethodService:PaymentMethodService,
    private dialog: MatDialog,
    private showMessage: ShowMessageService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.readCRUD();
  }

  displayedColumns: string[] = ['select','nombres',  'state'];
  dataSource = new MatTableDataSource<PaymentMethod>();
  selection = new SelectionModel<PaymentMethod>(true, []);

  clickedRows = new Set<PaymentMethod>();

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
  checkboxLabel(row?: PaymentMethod): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.paymthdsId}`;
  }

  //CRUD
  createCRUD(object: any): boolean {
    throw new Error('Method not implemented.');
  }

  readCRUD(): boolean {
    this.isLoading = true;
    this.paymentMethodService.all().subscribe({
      next: data => {
        this.dataSource.data = data.data as PaymentMethod[];
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

 
  openDialogAdd(): boolean {
    const dialogRef = this.dialog.open(EditComponent, {
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
    let ids = this.selection.selected.reduce((a: number[], b: PaymentMethod) => (b.paymthdsId == null) ? a : [...a, b.paymthdsId], [])
    let periodSelected : PaymentMethod = this.selection.selected.filter(o => o.paymthdsId == ids[0])[0];
    const dialogRef = this.dialog.open(EditComponent, {
      panelClass: 'dialog',
      data: {
        row: periodSelected,
        type: TYPES_ACTIONS_DIALOG.UPD
      }
    });

    dialogRef.afterClosed().subscribe((result:PaymentMethod) => {
      if(result) {
        this.updPeriod(result, result.paymthdsId || -1);
      }
    });
    return false;
  }

  openDialogdAddAndUpd(object: any): boolean {
    throw new Error('Method not implemented.');
  }

  //FUNCIONES
  addPeriod(p: PaymentMethod): boolean {
    this.paymentMethodService.add(p).subscribe({
      next: data => {
        /**mostramos un mensaje de exito */
        this.showMessage.success({ message: data.msg });
        /*obtenemos el ultimo business devuelto por el backend y que viene en data */
        const p = data.data as PaymentMethod[]

        /*El nuevo usuario lo añadimos a la primera fila de la tabla */
        this.dataSource.data.unshift(...p);
        this.selection.clear();
        /**actualizamops paginator */
        this.paginator._changePageSize(this.paginator.pageSize)
      },
      error: error => {
        /**Mostramos un mensaje de error y pasamos una funcion para reintenar nuevamente añdir el usuario  */
        this.showMessage.error({ message: error.error.message, action: () => this.addPeriod(p) })
      }
    });
    return true;
  }

  updPeriod(p: PaymentMethod, prdsId:number): boolean {
    this.paymentMethodService.upd(p, prdsId).subscribe({
      next: data => {

        this.showMessage.success({ message: data.msg });
        const p = data.data as PaymentMethod[];
        const objIndex = this.dataSource.data.findIndex((obj => obj.paymthdsId == p[0].paymthdsId));
        this.dataSource.data[objIndex] = p[0];
        this.selection.clear();
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      error: error => {
        this.showMessage.error({ message: error.error.message, action: () => this.updPeriod(p, prdsId) });
      }
    });
    return true;
  }

  delPeriod(){
    let ids = this.selection.selected.reduce((a: number[], b: PaymentMethod) => (b.paymthdsId == null) ? a : [...a, b.paymthdsId], []);
    this.wantDelete(()=>this.deleteCRUD(ids))

  }

  wantDelete(d:()=>void){
    this.dialog
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
    this.paymentMethodService.dels(ids).subscribe({
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
    this.paymentMethodService.changeState(prdsId, prdsState).subscribe({
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

