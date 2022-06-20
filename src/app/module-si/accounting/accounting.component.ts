


import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';

import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { Payment, PAYMENT_KIND_CANCELED } from 'src/app/interfaces/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';
import { Bussines } from 'src/app/interfaces/bussines';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { DialogEditOneInputComponent } from 'src/app/shared/components/dialog-edit-one-input/dialog-edit-one-input.component';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';

import { MainViewService } from '../main-view/main-view.service';


@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent implements OnInit {

  PKC=PAYMENT_KIND_CANCELED
  isLoading = true;
  serBuss: Bussines | undefined;
  /*Parametros para buscar */
  dateStart:Date=new Date(new Date().getFullYear(), 0,1)
  dateEnd:Date=new Date()
  wordlike:string=''
  
  private hqId:number=0;

  /* Params Para buscar*/
  
  

  constructor(
    private paymentService: PaymentService,
    public dialogEditUser: MatDialog,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private showMessage: ShowMessageService,
    private datepipe: DatePipe,
    private loadingService:LoadingService,
    private mainViewService: MainViewService


  ) { }



  ngOnInit(): void {
    this.listenRoute((o)=>{this.selectSearch()})
  }

  private listenRoute(c:(o:any)=>void){
    this.mainViewService.getParams().subscribe(params=>{
      this.hqId = parseInt(params['hqId'] || 0)
      c(this.hqId)
    })
  }

  displayedColumns: string[] = ['select', 'bussId','position','payClientRucOrDni' ,'payClientName','name', 'weight', 'symbol','ticket','invoice', 'options'];
  dataSource = new MatTableDataSource<Payment>();

  selection = new SelectionModel<Payment>(true, []);

  clickedRows = new Set<Payment>();

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
  checkboxLabel(row?: Payment): string {
    //console.log(this.selection.selected)
    if (!row) {
      //console.log(`${this.isAllSelected() ? 'deselect' : 'select'} all`);
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    } else {
      //return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
      //console.log(`${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.ID}`)
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.bussId}`;
    }

  }

/*****FUNCIONES CALL FROM TEMPLATE***** */

selectSearch(){
 let  dateStart = this.datepipe.transform(this.dateStart, 'yyyy/MM/dd') || '';
 let dateEnd = this.datepipe.transform(this.dateEnd, 'yyyy/MM/dd') || '';


  this.readCRUD(this.hqId, dateStart, dateEnd, this.wordlike)
}
  /*************** PARA CARGAR LOS MODALES************ */
  /*EL modal para agregar */


 



  /*************** CRUD CON BASE DE DATOS************ */



  createCRUD(object: any): boolean {
    return false;
  }

  /*para cargar a la tabla*/
  readCRUD(hqId:number, dateStart:string, dateEnd:string, wordlike:string): boolean {
    this.isLoading = true;
    this.paymentService.all(0,hqId,dateStart, dateEnd, wordlike ).subscribe({
      next: data => {
        console.log(data.data)
        this.dataSource.data = data.data as Payment[];
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
/*** */
public openPDFNewWindow(p:Payment){
  if(p.payToken)
    window.open(environment.API_URL+"/v1/payments/"+p.payToken+"/proof-of-payment");
} 
 dateFormat(d: string) {
    let t = ''
    if (d) {


      t = this.datepipe.transform(new Date(d), 'dd/MM/yyyy hh:mm:ss a') || '';
    }
    return t;
  }



/*Cancelar Pago */
  beforeCancelPayment(id:number, payment:Payment){
    this.wantCancelPayment(()=>this.cancelPayment(id, payment))
  }

  wantCancelPayment(d:()=>void){
    this.dialogEditUser
      .open(DialogConfirmationComponent, {
        data: `¿Esta seguro que desea anular este pago?\nTen en cuenta que esta acción no se puede deshacer.`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          d();
        } else {
          
        }
      });
  }

   cancelPayment(payId: number, payment:Payment): boolean {
    this.paymentService.cancel(payId, payment).subscribe({
      next: data=>{
        this.showMessage.success({message: data.msg});
        let p=data.data as Payment;
        let indexRow=this.dataSource.data.findIndex(e=>e.payId);
        this.dataSource.data[indexRow] = p
        this.dataSource.data=this.dataSource.data
      }, 
      error: error=>{
        this.showMessage.error({message: error.error.message})
      }
    })
    return true;
  }

  /*Crud services */
  /**Para añadir usuario  */
  

/*Agregar Boleta */
beforeSetTicket(id:number, payment:Payment){
  this.openDialogTicketOrInvoice({value:payment.payTicketSN, title:'Agregar Boleta | '+payment.paySerie+' - '+payment.payNumber, maxLength:20},(value)=>{ payment.payTicketSN=value;this.setTicket(id, payment)})
}


setTicket(payId: number, payment:Payment): boolean {
  this.loadingService.show()
  this.paymentService.setTicket(payId, payment).subscribe({
    next: data=>{
      this.showMessage.success({message: data.msg});
      let p=data.data as Payment;
      let indexRow=this.dataSource.data.findIndex(e=>e.payId==payId);
      this.dataSource.data[indexRow] = p
      this.selection.clear()
      this.dataSource.data=this.dataSource.data
      this.loadingService.hide()
    }, 
    error: error=>{
      this.showMessage.error({message: error.error.message})
      this.loadingService.hide()
    }
  })
  return true;
}
/*Agregar Factura */
beforeSetInvoice(id:number, payment:Payment){
  this.openDialogTicketOrInvoice({value:payment.payInvoiceSN, title:'Agregar Factura | '+payment.paySerie+' - '+payment.payNumber, maxLength:20},(value)=>{ payment.payInvoiceSN=value;this.setInvoice(id, payment)})
}



 setInvoice(payId: number, payment:Payment): boolean {
  this.loadingService.show()
  this.paymentService.setInvoice(payId, payment).subscribe({
    next: data=>{
      this.showMessage.success({message: data.msg});
      let p=data.data as Payment;
      let indexRow=this.dataSource.data.findIndex(e=>e.payId==payId);
      this.dataSource.data[indexRow] = p
      this.selection.clear()
      this.dataSource.data=this.dataSource.data
      this.loadingService.hide()
    }, 
    error: error=>{
      this.showMessage.error({message: error.error.message})
      this.loadingService.hide()
    }
  })
  return true;
}


openDialogTicketOrInvoice(data:{},d:(value:string)=>void){
  this.dialogEditUser
    .open(DialogEditOneInputComponent, {
      data: data
    })
    .afterClosed()
    .subscribe((value: string) => {
      if (value) {
        d(value);
      } else {
        
      }
    });
}



}


