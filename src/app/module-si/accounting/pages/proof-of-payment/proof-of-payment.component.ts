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
import { User } from 'src/app/interfaces/user';
import { PaymentDetail } from 'src/app/interfaces/payment-detail';
import { Payment, PAYMENT_STATE, PAYMENT_KIND_DOC } from 'src/app/interfaces/payment';
import { AppointmentTemp } from 'src/app/interfaces/appointment-temp';
import { Bussines } from 'src/app/interfaces/bussines';
import { ServicesProvided } from 'src/app/interfaces/services-provided';
import { PaymentService } from 'src/app/services/payment.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { Services} from 'src/app/interfaces/services'
import {ServicesService } from 'src/app/services/services.service'
import {Period} from 'src/app/interfaces/period'
import {PeriodService} from 'src/app/services/period.service'
import { environment } from 'src/environments/environment';

import { Subscription } from 'rxjs';
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

  /*Obtener todos los serviciso */
  private services:Services[]=[]
  private periods:Period[]=[]

  /*payment*/
  payment:Payment
  dataSourcePD = new MatTableDataSource<PaymentDetail>([]);

  messageError:string='';

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

  ) { 
    this.payment={}
    this.payment.paymentDetails=[]
    if(this.paramsDialog.payLinkBuss){
      this.loadPreviewLinkBuss(
        this.paramsDialog.bussines,
        this.paramsDialog.servicesProvideds,
        this.paramsDialog.appointmentTemp
        )
    }else{
      this.loadPreviewWithoutBuss(
        this.paramsDialog.appointmentTemp
      )
    }
  }
  ngOnInit(): void {
    this.renderScreen()
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
  private loadPreviewLinkBuss(buss:Bussines, sps:ServicesProvided[], a:AppointmentTemp){
    /*Datos cliente */
   
    this.payment.payClientRucOrDni=buss.bussRUC;
    this.payment.payClientName=buss.bussName;
    this.payment.payClientAddress=buss.bussAddress;
    this.payment.payClientEmail=buss.bussEmail
    this.payment.payClientTel=buss.bussTel;

    this.payment.hqId=a.hqId;
    this.payment.apptmId=a.apptmId
    this.payment.payState=PAYMENT_STATE.PENDING
    this.payment.payKindDoc=PAYMENT_KIND_DOC.RECIBO
    /*Detalle */
    this.payment.paymentDetails=[]
    for(let sp of sps){
      this.payment.paymentDetails.push({pdsQuantity:1, spId:sp.spId, pdsDescription: sp.spName, pdsUnitPrice:sp.spDebt,  pdsAmount: sp.spDebt})
     
    }
    this.dataSourcePD.data=this.payment.paymentDetails
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
  }

  renderScreen = (): void => {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })
  }

  onReturn = (p: Payment): void => this.dialogRef.close(p);
  /*Prepara para guaarda y actualizar */
  ok() {
    //this.imprimirPDF('')
    this.beforeAddPayment()
    //if(this.userSelected)
    //this.onReturn(this.userSelected)
  }
  /** Gets the total cost of all transactions. */
   getTotalCost() {
    return this.dataSourcePD.data.map(t => t.pdsAmount).reduce((acc, value) => (acc || 0) +(value || 0), 0);
  }


  /*api */
  private beforeAddPayment(){
    this.messageError=''
    this.payment.paymentDetails=this.dataSourcePD.data;
    let vpd=this.validatePaymentDetails(this.payment.paymentDetails)
    if(vpd){
      this.messageError=vpd
      return;
    }
    if(vpd){
      this.messageError=vpd
      return;
    }
    console.log("BEFORE ADD PAYAMENT",this.payment)
    this.addPayment(this.payment)
  }
  
  private addPayment(payment:Payment){
    this.isLoadingEnd=true
    this.paymentService.add(payment).subscribe({
      next: (d)=>{
      this.payment=d.data as Payment  
      console.log("addPayment", d.data)
      this.printPDF(this.payment.payToken || '-1')
      this.isLoadingEnd=false
      },
       error:(e)=>{
      //this.messageError=e.error.message
        
      this.messageError="Surgio un error: "+e.error.message.match(/(?<=<msg>)(.*)(?=<msg>)/s)[0]  
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

      }, error:(e:any)=>{
        this.isLoadingEnd=false
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
}

interface GridResponsive {
  [key: string]: number
}
