import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import {
  AbstractControl, FormBuilder, ValidationErrors, AsyncValidatorFn,
  FormControl, FormGroup, Validators
} from '@angular/forms';
//import {Observable} from "rxjs/Observable";

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { find, Observable, Subscription } from 'rxjs';
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
@Component({
  selector: 'app-proof-of-payment',
  templateUrl: './proof-of-payment.component.html',
  styleUrls: ['./proof-of-payment.component.scss']
})
export class ProofOfPaymentComponent implements OnInit, OnDestroy {
  isLoading:boolean=false;

  /*Obtener todos los serviciso */
  private services:Services[]=[]
  private periods:Period[]=[]

  /*payment*/
  payment:Payment
  dataSourcePD = new MatTableDataSource<PaymentDetail>([]);


  usersWithPerson:User[]=[];

  userSelected?:User;

  messageError:string='';



  setUserSelected(useSelected:any){
    this.userSelected=useSelected
  }

  private findSubPeriod(v:string){
    return this.subPeriods.find(o=>o.value==v)
  }

  private findService(v:number){
    return this.services.find(o=>o.svId==v)
  }
  private findPeriod(v:number){
    return this.periods.find(o=>o.prdsId)
  }


  cols: number = 1;
  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  mediaSub!: Subscription;


  title = "Emitir comprobante "
  
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
    private servicesService:ServicesService, 
    private periodService:PeriodService

  ) { 
    this.payment={}
    this.payment.paymentDetails=[]
    if(/*this.paramsDialog.payLinkBuss*/true){
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
    //this.selectCategory(this.paramsDialog.row)
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
    a= a || {hqId:1}
    buss=buss || {bussId:1}

    

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
    this.payment.paymentDetails.push({pdsQuantity:1, spId:1, pdsUnitPrice:600, pdsAmount: 600})
    /*for(let sp of sps){
      this.payment.paymentDetails.push({pdsQuantity:1, spId:sp.spId, pdsDescription: this.findPeriod(1)+"" , pdsUnitPrice:sp.spCost,  pdsAmount: sp.spCost})
     
    }*/

  }
  private loadPreviewWithoutBuss(a:AppointmentTemp ={}){
     a= a || {hqId:1}
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

  onReturn = (user: User): void => this.dialogRef.close(user);
  /*Prepara para guaarda y actualizar */
  ok() {
    //this.imprimirPDF('')
    this.beforeAddPayment()
    //if(this.userSelected)
    //this.onReturn(this.userSelected)
  }
  
  

  displayedColumns2: string[] = ['pdsQuantity','pdsDescription', 'pdsUnitPrice','pdsAmount', 'pdsDelete'];
  transactions: PaymentDetail[] = [
    {pdsQuantity: 1, pdsDescription:'Casa', pdsUnitPrice:23798.977, pdsAmount:909},
    {pdsQuantity: 1, pdsDescription:'Casa', pdsUnitPrice:23.0, pdsAmount:909},
    {pdsQuantity: 1, pdsDescription:'Casa', pdsUnitPrice:23.0, pdsAmount:909},
    {pdsQuantity: 1, pdsDescription:'Casa', pdsUnitPrice:23.0, pdsAmount:909}
  
  ];

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
    
    this.addPayment(this.payment)
  }
  
  private addPayment(payment:Payment){
    this.paymentService.add(payment).subscribe({
      next: (d:any)=>{
        console.log("blob->",d)
        var blob = new Blob([d.body], {type: 'application/pdf'});
        const blobUrl = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow?.print();
      }, error:(e:any)=>{
        
        console.log(e)
      }
    })
  }

  private validatePaymentDetails(pd:PaymentDetail[]):string|null{
    for(const  [i, e] of pd.entries()){
      if(!e.pdsQuantity){
        return `En detalle, en la fila ${(i+1)} la cantidad no es válido.`
      }else if(!e.pdsDescription){
        return `En detalle, en la fila ${(i+1)} la descripción no es válido.`
      }else if(!e.pdsUnitPrice){
        return `En detalle, en la fila ${(i+1)} el precio unitario  no es válido.`
      }
    }
    return null;
  }

  /*get all services */
  private readCRUDServices(){
    this.servicesService.all()?.subscribe({
      next: d=>{
        this.services=d
    }, error:e=>{
      this.showMessage.error({message:e.error.message})
    }})
  }

  private readCRUDPeriods(){
    this.periodService.all().subscribe({
      next: d=>{
        this.periods=d.data as Period[]
      },
       error:e=>{

      }
    });
  }
  /*OPtimizar parte de codigo  */
private subPeriods: SubPeriod[] = [
    {value: '1', name: 'Enero'},
    {value: '2', name: 'Febrero'},
    {value: '3', name: 'Marzo'},
    {value: '4', name: 'Abril'},
    {value: '5', name: 'Mayo'},
    {value: '6', name: 'Junio'},
    {value: '7', name: 'Julio'},
    {value: '8', name: 'Agosto'},
    {value: '9', name: 'Setiembre'},
    {value: '10', name: 'Octubre'},
    {value: '11', name: 'Noviembre'},
    {value: '12', name: 'Diciembre'},
  ];
  
}

interface GridResponsive {
  [key: string]: number
}





interface SubPeriod {
value: string;
name: string;
}


