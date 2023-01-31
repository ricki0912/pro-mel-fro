import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentTemp } from 'src/app/interfaces/appointment-temp';
import { Bussines } from 'src/app/interfaces/bussines';
import { ProofOfPaymentComponent } from 'src/app/module-si/accounting/pages/proof-of-payment/proof-of-payment.component';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import {ServicesByPeriod} from 'src/app/module-si/client-view/pages/services/services.component'
import { TServicesProvided } from 'src/app/interfaces/services-provided';
import { ClientViewService } from '../../client-view.service';
import { FloatingWaitingLineService } from 'src/app/module-si/main-view/pages/floating-waiting-line/floating-waiting-line.service';

@Component({
  selector: 'app-pay-in-group',
  templateUrl: './pay-in-group.component.html',
  styleUrls: ['./pay-in-group.component.scss']
})
export class PayInGroupComponent implements OnInit {

  _totalToPay:number=0.0
  private business?:Bussines
  public appointmentTemp:AppointmentTemp | null=null
  @Input() servProByPeriod:ServicesByPeriod[]=[]
  @Output() reloadAllServices = new EventEmitter<boolean>();

  constructor(
    private dialog:MatDialog,
    private showMessage: ShowMessageService,
    private clientViewService:ClientViewService,
    private fwlService:FloatingWaitingLineService


  ) { }
  ngOnInit(): void {
    this.listenSelectedBusiness(()=>{})
    
    this.getCurrentAttention()
  }


  //FUNCIONES
  prepareBeforeGenerateProof(){
    if(!this.business){
      this.showMessage.error({message:'Cliente vació'})
      return;
    }
    if(!this.getTotalPay()){
      this.showMessage.error({message:'Seleccione más de un servicio.'})
      return;
    }
    /*
    if(!this.appointmentTemp){
      this.showMessage.error({message:'Tiene que sacar su ticket de atención para poder realizar un pago.'})
      return;
    }*/


    this.openDialogEmitProofOfPayment()

  }


  openDialogEmitProofOfPayment() {
    const dialogRef = this.dialog.open(ProofOfPaymentComponent, {
      panelClass: 'dialog',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {
        row: null,
        appointmentTemp:this.appointmentTemp,
        payLinkBuss:true,
        bussines: this.business,
        servicesProvideds: this.servProByPeriod.reduce((a:TServicesProvided[],b)=>([...b.services, ...a]),[]),
        type: 1
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
          this.reloadAllServices.emit(true)
       // this.readServiceProvidedsByDBP(this.bp.dbp?.dbpId || -1)

        //this.transferCallToTeller(this.tAppointmentTemp?.apptmId || -1, result.tellId || -1)

        /*const apptmIds:number[]= this.selection.selected.reduce(( p:number[], c:TAppointmentTemp)=>[...p, c.apptmId || -1], [])
        this.updateTeller(apptmIds, result.tellId || -1)*/
      }
    });
  }
  
  private listenSelectedBusiness(o:()=>void){
    this.clientViewService.getSelectedBussines().subscribe((b:Bussines | null)=>{
      if(b)
        this.business=b;
    })
  }

  private getCurrentAttention(){
    this.fwlService.getCurrentAttion().subscribe({
      next:(d)=>{
        this.appointmentTemp=d 
        console.log(d)
      },
      error:(e)=>{

      }
    })
}


getTotalPay=()=>this.servProByPeriod.reduce((a, b:ServicesByPeriod)=>a=a+b.services.reduce((d,e)=>d=Number(d)+Number(((e.spDebt)? e.spDebt:0.0)),0), 0.0)

}
