


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
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { GlobalHelpers } from 'src/app/global/helpers/global.helpers';
import { PMS } from 'src/app/core/permission/pms.enum';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent implements OnInit {

  PKC=PAYMENT_KIND_CANCELED
  PMS=PMS
  isLoading = true;
  serBuss: Bussines | undefined;
  /*Parametros para buscar */
  dateStart:Date=new Date(new Date().getFullYear(), new Date().getMonth(),1)
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

  displayedColumns: string[] = ['select', 'bussId','position','payClientRucOrDni' ,'payClientName','name', 'weight', 'symbol','ticket','invoice', 'receipt-honorary','options'];
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

 dateFormat=(d: Date) =>GlobalHelpers.formatDateAndHour(d)



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


/* */

beforeSetReceiptHonorary(id:number, payment:Payment){
  this.openDialogTicketOrInvoice({value:payment.payReceiptHonorarySN, title:'Agregar Recibo por Honorarios | '+payment.paySerie+' - '+payment.payNumber, 
      maxLength:20},
      (value)=>{ payment.payReceiptHonorarySN=value;this.setReceiptHonorary(id, payment)})
}


 setReceiptHonorary(payId: number, payment:Payment): boolean {
  this.loadingService.show()
  this.paymentService.setReceiptHonorary(payId, payment).subscribe({
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


/*open dialog */
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


/*Funciones adicionales */
exportExcel(){
  
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet("Hoja 01");

  //CONVIRTIENDO NUESTRO ARREGLO A UN FORMATO LEGIBLE PARA EXCEL USANDO EXCELJS
  worksheet.addRow(undefined);
  let index=0;
  for (let x1 of this.dataSource.data){
      index++
      let x2=Object.keys(x1);
      let temp=[]
      temp.push(index)
      temp.push(x1.bussId)
      temp.push(GlobalHelpers.formatDate((x1.payDatePrint|| new Date()), 'yyyy-MM-dd'))
      temp.push(x1.paySerie)
      temp.push(x1.payNumber)

      temp.push(x1.payClientRucOrDni)
      /*temp.push(x1.payClientName)
      temp.push(x1.payClientTel)*/
      temp.push(x1.payClientEmail)

      temp.push(Number(x1.payTotal))

      temp.push((x1.payIsCanceled==1)?'SI':'NO')

      temp.push(x1.payTicketSN)
      temp.push(x1.payInvoiceSN)
      temp.push(x1.payReceiptHonorarySN)
      /*temp.push(environment.API_URL+"/v1/payments/"+x1.payToken+"/proof-of-payment")*/

      
      /*for(let y of x1.){
        temp.push(y)
      }*/
      worksheet.addRow(temp)
  }
  //NOMBRE DEL ARCHIVO RESULTANTE
  let fname="Pagos";

  //ASIGNACIÓN DE LA CABECERA DEL DOCUMENTO EXCEL DONDE CADA CAMPO DE LOS DATOS QUE EXPORTAREMOS SERA UNA COLUMNA
  worksheet.columns = [
      { header: 'NRO', key: 'col1', width: 10},
      { header: 'CLIENTE', key: 'col2', width: 10},
      { header: 'FECHA', key: 'col3', width: 30},
      { header: 'SERIE', key: 'col4', width: 15},
      { header: 'NÚMERO', key: 'col5', width: 20},
      { header: 'RUC/DNI', key: 'col6', width: 20},
      { header: 'NOMBRE/RAZÓN SOCIAL', key: 'col7', width: 50},
      /**{ header: 'TELÉFONO', key: 'col7', width: 20},
      { header: 'CORREO', key: 'col8', width: 20},**/
      { header: 'TOTAL', key: 'col8', width: 20},
      { header: 'ANULADO', key: 'col9', width: 20},
      { header: 'BOLETA DE VENTA', key: 'col10', width: 20},
      { header: 'FACTURA', key: 'col11', width: 20},
      { header: 'R/H', key: 'col12', width: 20},
      /*{ header: 'BOLETA', key: 'col14', width: 30},*/
  ]as any;

  //PREPACION DEL ARCHIVO Y SU DESCARGA
  workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'.xlsx');
  });

}

public subStringName=(s:string)=>GlobalHelpers.subString(s,40);


}


