import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import {
  AbstractControl, FormBuilder, ValidationErrors, AsyncValidatorFn,
  FormControl, FormGroup, Validators
} from '@angular/forms';
//import {Observable} from "rxjs/Observable";

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { Teller } from 'src/app/interfaces/teller';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentDetail } from 'src/app/interfaces/payment-detail';
import { Payment, PAYMENT_STATE, PAYMENT_KIND_DOC } from 'src/app/interfaces/payment';
import { AppointmentTemp } from 'src/app/interfaces/appointment-temp';
import { Bussines } from 'src/app/interfaces/bussines';
import { ServicesProvided } from 'src/app/interfaces/services-provided';
import { PaymentService } from 'src/app/services/payment.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { Services} from 'src/app/interfaces/services'
import {Period} from 'src/app/interfaces/period'
import { environment } from 'src/environments/environment';

import { Subscription } from 'rxjs';
import { DPaymentPaymentMethod } from 'src/app/interfaces/d-payment-payment-method';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { PaymentMethod, PAYMENT_METHOD_STATE } from 'src/app/interfaces/payment-method';
import { WaitingLineService } from 'src/app/socket/waiting-line.service';
import { SocketInterface, SOCKET_ACTION } from 'src/app/global/parents/socket.interface';
import { PrintServer,PRINT_SERVER_ANSWER_RESPONSE } from 'src/app/interfaces/print-server';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'app-proof-of-payment',
  templateUrl: './proof-of-payment.component.html',
  styleUrls: ['./proof-of-payment.component.scss']
})
export class ProofOfPaymentComponent implements OnInit, OnDestroy {
  PS=PAYMENT_STATE
  isLoading:boolean=false;

  isLoadingEnd:boolean=false;

  displayedColumns2: string[] = ['pdsQuantity','pdsDescription', 'pdsUnitPrice','pdsAmount', 'pdsDelete'];
  dataSourcePD = new MatTableDataSource<PaymentDetail>([]);

  displayedColumnDPPM:string[]=['i', '']
  dataSourceDPPM=new MatTableDataSource<DPaymentPaymentMethod>([])
  dPaymentPaymentMethods:DPaymentPaymentMethod[]=[]
  /*Obtener todos los serviciso */
  private services:Services[]=[]
  private periods:Period[]=[]

  public paymentMethods:PaymentMethod[]=[]

  /*payment*/
  payment:Payment

  /*Es la forma de pago  */
  PKD=PAYMENT_KIND_DOC
  swapForDocPayment= PAYMENT_KIND_DOC.RECIBO


  messageError:string='';
  messageSuccess:string='';



  cols: number = 1;
  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  mediaSub!: Subscription;


  title = "Imprimir Comprobante "

  timeWaitResponsePrintServer?: ReturnType<typeof setTimeout> = undefined

  
  constructor(
    public mediaObserver: MediaObserver,
    private paymentService:PaymentService,
    public dialogFindCategory: MatDialog,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { 
      appointmentTemp:AppointmentTemp,
      bussines:Bussines, 
      servicesProvideds:ServicesProvided[], 
      row: Teller,
      type: Number,
      payLinkBuss:boolean },
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private loadingService:LoadingService,
    private dialogRef: MatDialogRef<ProofOfPaymentComponent>,
    private paymentMethodService:PaymentMethodService,
    private _waitingLineService:WaitingLineService,
    private _currentUser:TokenStorageService

  ) { 
    this.payment={}
    this.payment.paymentDetails=[]
    

    if(this.paramsDialog.payLinkBuss){
      this.loadPreviewLinkBuss(
        this.paramsDialog.bussines,
        this.paramsDialog.servicesProvideds,
        this.paramsDialog.appointmentTemp,
        this._currentUser.getHqId()
        )
    }else{
      this.loadPreviewWithoutBuss(
        this.paramsDialog.appointmentTemp
      )
    }
  }
  ngOnInit(): void {
    if(this._currentUser.getTeller()?.tellId
     && this._currentUser.getHqId()){
      this.getSocketPrintServer(this._currentUser.getHqId(), String(this._currentUser.getTeller()?.tellId)) 
      this.setSocketPrintServer(this._currentUser.getHqId(), 'IMPRESORA 01', {action: SOCKET_ACTION.PRINTER_IS_ENABLE, data:{tellId:this._currentUser.getTeller()?.tellId}})

      
    }
    this.renderScreen()
    this.readCRUDPaymentMethods(PAYMENT_METHOD_STATE.ENABLE)
  }
  

  
  updPdsQuantity(el: PaymentDetail, quantity: number) {
    if (quantity == null) { return; }
    el.pdsQuantity = quantity;
    el.pdsAmount=el.pdsQuantity*(el.pdsUnitPrice || 0)
    //this.dataSource.data = this.dataSource.data;
  }
  updPdsDescription(el: PaymentDetail, description: string) {
    if (description == null) { return; }
    el.pdsDescription = description;
    //this.dataSource.data = this.dataSource.data;
  }
  updPdsUnitPrice(el: PaymentDetail, unitPrice: number) {
    if (unitPrice == null) { return; }
    el.pdsUnitPrice = unitPrice;
    el.pdsAmount=(el.pdsQuantity || 0)*el.pdsUnitPrice
    //this.dataSource.data = this.dataSource.data;
  }
  private loadPreviewLinkBuss(buss:Bussines, sps:ServicesProvided[], a:AppointmentTemp, hqId:number){
    /*Datos cliente */
   
    this.payment.payClientRucOrDni=buss.bussRUC;
    this.payment.payClientName=buss.bussName;
    this.payment.payClientAddress=buss.bussAddress;
    this.payment.payClientEmail=buss.bussEmail
    this.payment.payClientTel=buss.bussTel;
    this.payment.bussId=buss.bussId;


    this.payment.hqId=(a)?a.hqId:hqId;
    this.payment.apptmId=(a)?a.apptmId:undefined

    this.payment.payState=PAYMENT_STATE.PENDING
    this.payment.payKindDoc=PAYMENT_KIND_DOC.RECIBO
    /*Detalle */
    this.payment.paymentDetails=[]
    for(let sp of sps){
      this.payment.paymentDetails.push({pdsQuantity:1, spId:sp.spId, pdsDescription: sp.spName, pdsUnitPrice:sp.spDebt,  pdsAmount: sp.spDebt})
     
    }
    this.dataSourcePD.data=this.payment.paymentDetails
    this.payment.dPaymentPaymentMethods=[]
    this.dPaymentPaymentMethods.push({dppmAmount: this.getTotalCost()});
  }
  private loadPreviewWithoutBuss(a:AppointmentTemp ={}){
    this.payment.payClientRucOrDni=a.apptmNumberDocClient || '';
    this.payment.payClientName=a.apptmNameClient  ||''
    this.payment.hqId=a.hqId
    this.payment.apptmId=a.apptmId
    this.payment.payState=PAYMENT_STATE.PENDING
    this.payment.payKindDoc=PAYMENT_KIND_DOC.RECIBO

    this.payment.paymentDetails=[]
    this.payment.paymentDetails.push({pdsQuantity:1, pdsDescription:'Servicios contables', pdsUnitPrice:0, pdsAmount: 0})
    this.dataSourcePD.data = this.payment.paymentDetails;
    this.payment.dPaymentPaymentMethods=[]
    this.dPaymentPaymentMethods.push({dppmAmount: this.getTotalCost()});

  }

  addRowInDPaymentPaymentMethods(){
    
    this.dPaymentPaymentMethods?.push({dppmAmount:0,})
  }

  removeRowFromDPaymentPaymentMethods(index:number){
    this.dPaymentPaymentMethods?.splice(index,1)
  }

  addRowInPaymentDetails(){
    
    this.dataSourcePD.data.push({pdsQuantity:1, pdsDescription:'', pdsUnitPrice:0, pdsAmount: 0})
    this.dataSourcePD.data=this.dataSourcePD.data
  }
  
  removeRowFromPaymentDetails(index:number){
    this.dataSourcePD.data.splice(index,1)
    this.dataSourcePD.data=this.dataSourcePD.data
  }

  
  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
    //this._waitingLineService.disconnect()
    //this.dialogRef.()
  }

  renderScreen = (): void => {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })
  }

  private onReturn = (p: Payment): void => this.dialogRef.close(p);
  /*Prepara para guaarda y actualizar */
  ok() {
    //this.imprimirPDF('')
    this.beforeAddPayment()
    //if(this.userSelected)
    //this.onReturn(this.userSelected)
  }
  close(){
    this.onReturn(this.payment)
  }
  /** Gets the total cost of all transactions. */
   getTotalCost() {
    return this.dataSourcePD.data.map(t => t.pdsAmount).reduce((acc, value?:number) => (acc || 0) +(Number(value) || 0), 0);
  }
  private getTotalFromPaymentMethod() {
    return this.dPaymentPaymentMethods.map(t => t.dppmAmount).reduce((acc, value?:number) => (acc || 0) +(Number(value) || 0), 0);
  }

  getDifferenceTotal(){
    return (this.getTotalCost() || 0)- (this.getTotalFromPaymentMethod() || 0)
  }

  /*Read crud Payment Method  */
  private readCRUDPaymentMethods(paymthdsState:number=0){
    this.isLoading=true
    this.paymentMethodService.all(paymthdsState).subscribe({
      next:d=>{
        this.paymentMethods=d.data as PaymentMethod[]
        this.isLoading=false
      }, 
      error:e=>{
        this.showMessage.error({message:e.error.message})
        this.isLoading=false
      }

      
    });
  }

  /*api */
  private beforeAddPayment(){
    this.messageError=''
    this.messageSuccess=''
    this.payment.paymentDetails=this.dataSourcePD.data;
    let vpd=this.validatePaymentDetails(this.payment.paymentDetails)
    if(vpd){
      this.messageError=vpd
      return;
    }
   
    /*Validar formas de pago  */
    this.payment.dPaymentPaymentMethods=this.dPaymentPaymentMethods;
    let vpm=this.validatePaymentMethods(this.payment.dPaymentPaymentMethods)
    if(vpm){
      this.messageError=vpm
      return;
    }
    let dt=Number(this.getDifferenceTotal())
    /*Validar que sea 0 */
    if(dt>0 || dt<0){
      this.messageError='En método de pago, verifique que el monto este correctamente asignado.'
      return;
    }
    let swapForDocPaymentError=this.validateSwapForDocPayment();
    if(swapForDocPaymentError){
      this.messageError=swapForDocPaymentError
      return;
    }

    

    console.log("BEFORE ADD PAYAMENT",this.payment)
    this.addPayment(this.payment)
  }
  
  private addPayment(payment:Payment){
    this.messageSuccess="Generando pago..."
    
    this.isLoadingEnd=true
    this.paymentService.add(payment).subscribe({
      next: (d)=>{
      this.payment=d.data as Payment  
      console.log("addPayment", d)
      

      this.print()
      this.isLoadingEnd=false
      this.messageError=''
      this.messageSuccess="Pago Generado. Seleccione una opción de impresión"

      },
       error:(e)=>{
        console.log("addPayment", e)

      //this.messageError=e.error.message
      this.messageError="Surgio un error: "  
      this.messageError="Surgio un error: "+e.error.message.match(/(?<=<msg>)(.*)(?=<msg>)/s)[0]  
      this.messageSuccess=""
      this.isLoadingEnd=false
     
    }
    })
  } 
  public retryPrint(){
    if(this.payment.payState==this.PS.FILLED && this.payment.payToken){
      this.printPDF(this.payment.payToken )
    }else {
    
    }
  } 
  public openPDFNewWindow(){
    if(this.payment.payState==this.PS.FILLED && this.payment.payToken){
      window.open(environment.API_URL+"/v1/payments/"+this.payment.payToken+"/proof-of-payment");
    }else {
    
    }
  } 
  private printPDF(payToken:string){
    
    this.messageSuccess="Abriendo impresoras, espera un momento."
    this.messageError=""

    this.isLoadingEnd=true

    this.paymentService.getProofPDF(payToken).subscribe({
      next: (d:any)=>{
        console.log("blob->",d)
        var blob = new Blob([d.body], {type: 'application/pdf'});
        const blobUrl = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow?.print();
        this.isLoadingEnd=false
        this.messageSuccess="Abriendo impresoras... Si despues de varios segundos no abre seleccione una de las opciones. "
        this.messageError=""
      }
      , error:(e:any)=>{
        this.isLoadingEnd=false
        this.messageError="No se pudo obtener el documento para imprimir. Seleccione una de las opciones."
        this.messageSuccess=""
        console.log(e)
      }
    })
  }

  public sendToWhatsApp(){
    if(!this.payment.payClientTel){
        this.messageError=""
        return; 
    }
    window.open("https://wa.me/"+this.payment.payClientTel+"/?text=" + encodeURIComponent(environment.API_URL+"/v1/payments/"+this.payment.payToken+"/proof-of-payment"));
  }

  private validatePaymentDetails(pd:PaymentDetail[]):string|null{
    console.log("pd",pd)
    for(const  [i, e] of pd.entries()){
      console.log("fila por fila",(e))
      if(!e.pdsQuantity  || Number(e.pdsQuantity)<=0){
        return `En detalle, en la fila ${(i+1)} la cantidad no es válido.`
      }else if(!e.pdsDescription){
        return `En detalle, en la fila ${(i+1)} la descripción no es válido.`
      }else if(!e.pdsUnitPrice || Number(e.pdsUnitPrice)<=0){
        return `En detalle, en la fila ${(i+1)} el precio unitario  no es válido.`
      }
    }
    return null;
  }

  private validatePaymentMethods(pm:DPaymentPaymentMethod[]):string|null{


    for(const  [i, e] of pm.entries()){
      if(!e.paymthdsId  || Number(e.paymthdsId)<=0){
        return `En la fila ${(i+1)} seleccione un metodo de pago .`
      }else if(!e.dppmAmount || Number(e.dppmAmount)<=0){
        return `En método de pago, en la fila ${(i+1)} el monto no es válido.`
      }
    }
    return null;
  }

  private validateSwapForDocPayment(){
    if(this.swapForDocPayment==this.PKD.RECIBO){
      return null;
    }
    if(this.swapForDocPayment==this.PKD.BOLETA && !this.payment.payTicketSN){
      
      return `Si el recibo es canjeado por boleta, no olvide ingresar el número`
    }
    if(this.swapForDocPayment==this.PKD.FACTURA && !this.payment.payInvoiceSN){
      return `Si el recibo es canjeado por factura, no olvide ingresar el número`
    }
    return null
  }
  
  private print(){

  }

  public printRemote(){

    this.messageSuccess='Conectando con servidor de impresora remota. '
    this.messageError=''
    let hqId=this._currentUser.getTeller()?.hqId;
    let tellId=this._currentUser.getTeller()?.tellId
    
    let ps:SocketInterface<PrintServer> ={action:SOCKET_ACTION.SEND_PDF_LINK_TO_PRINTER, data: {psTitle:'Prueba', psCopies:2, psStateAnswer:PRINT_SERVER_ANSWER_RESPONSE.PRINT_PENDING,psUrl:environment.API_URL+"/v1/payments/"+this.payment.payToken+"/proof-of-payment",hqId:hqId, tellId: tellId }}
    
    this.setSocketPrintServer(this.payment.hqId || -1, "IMPRESORA 01", ps )
    this.timeWaitResponsePrintServer=setTimeout(() => { 
      this.messageError='No hemos logrado recibir respuesta del servidor de impresora remota. Selecciona otro medio de impresión'
      this.messageSuccess=''
      //this.printPDF(this.payment.payToken || '-1')
   }, 3000); 
  }

  private setSocketPrintServer(hqId:number,token:string, s:SocketInterface<PrintServer>){
    this._waitingLineService.setSocketPrintServer(hqId,token, s);  
    
  }

  private getSocketPrintServer(hqId:number, token:string){
    this._waitingLineService.getSocketPrintServer(hqId, token).subscribe({
      next:d=>{
        if(d.action==SOCKET_ACTION.PRINTER_READY_TO_PRINT){
          console.log("Impresora en remoto, disponible para imprimir")
        }else if(d.action==SOCKET_ACTION.RESPONSE_FROM_PRINT_SERVER){
          if(this.timeWaitResponsePrintServer)
          clearTimeout(this.timeWaitResponsePrintServer);
          let ps: PrintServer=d.data as PrintServer
          if(ps.psStateAnswer== PRINT_SERVER_ANSWER_RESPONSE.DOWNLOAD_ERROR || ps.psStateAnswer==PRINT_SERVER_ANSWER_RESPONSE.PRINT_ERROR){
            this.messageSuccess=''
            this.messageError=ps.psMessage || ''
          }else {
            this.messageSuccess=ps.psMessage || ''
            this.messageError=''
          }
        }
      },
      error:d=>{
        
      }
    })
  }

}

interface GridResponsive {
  [key: string]: number
}
