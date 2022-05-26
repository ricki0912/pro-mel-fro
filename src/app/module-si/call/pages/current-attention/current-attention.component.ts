import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { SocketInterface, SOCKET_ACTION } from 'src/app/global/parents/socket.interface';
import { AppointmentTemp, APPOINTMENT_STATE, TAppointmentTemp } from 'src/app/interfaces/appointment-temp';
import { Teller } from 'src/app/interfaces/teller';
import { ProofOfPaymentComponent } from 'src/app/module-si/accounting/pages/proof-of-payment/proof-of-payment.component';
import { FloatingWaitingLineService} from 'src/app/module-si/main-view/pages/floating-waiting-line/floating-waiting-line.service';
import { FindTellerComponent } from 'src/app/module-si/teller/pages/find-teller/find-teller.component';
import { AppointmentTempService } from 'src/app/services/appointment-temp.service';
import { ShowMessageComponent } from 'src/app/shared/components/show-message/show-message.component';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { WaitingLineService } from 'src/app/socket/waiting-line.service';
import { CommentCallComponent } from '../comment-call/comment-call.component';

@Component({
  selector: 'app-current-attention',
  templateUrl: './current-attention.component.html',
  styleUrls: ['./current-attention.component.scss']
})
export class CurrentAttentionComponent implements OnInit {
  isLoading:boolean=false
  tAppointmentTemp:TAppointmentTemp | null=null//{elapsedSeconds:0, elapsedSecondsStartAttention:0, catCode:'',apptmNro:0}
  @Input() selectedTApptm: TAppointmentTemp[]=[]
  @Input() selectedTeller: number=-1

  @Output() onReturnValue = new EventEmitter<AppointmentTemp>()


  
  constructor(
    private appointmentTempService:AppointmentTempService, 
    private dialog:MatDialog, 
    private showMessage:ShowMessageService,
    private waitingLineService: WaitingLineService,
    private fwlService:FloatingWaitingLineService

  ) { }

  ngOnInit(): void {
    this.getAttentionPendingByTeller(this.selectedTeller)
    this.fwlService.hide()

  }

 

 joinCodeTicket(element: TAppointmentTemp) {
    return element.catCode + String(element.apptmNro).padStart(2, '0')
  }


  returnValue() {
    this.onReturnValue.emit({})
  }

  public callNext(){
    if(this.selectedTApptm.length>0){
      this.startCallByTeller(this.selectedTeller, this.selectedTApptm[0].apptmId)
    }else {
      this.startCallByTeller(this.selectedTeller)
    }
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
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });
    dialogRef.afterClosed().subscribe((result: Teller) => {
      if (result) {
        this.transferCallToTeller(this.tAppointmentTemp?.apptmId || -1, result.tellId || -1)

        /*const apptmIds:number[]= this.selection.selected.reduce(( p:number[], c:TAppointmentTemp)=>[...p, c.apptmId || -1], [])
        this.updateTeller(apptmIds, result.tellId || -1)*/
      }
    });
  }
  openDialogChageTeller() {
    const dialogRef = this.dialog.open(FindTellerComponent, {
      panelClass: 'dialog',
      data: {
        row: null,
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });
    dialogRef.afterClosed().subscribe((result: Teller) => {
      if (result) {
        this.transferCallToTeller(this.tAppointmentTemp?.apptmId || -1, result.tellId || -1)

        /*const apptmIds:number[]= this.selection.selected.reduce(( p:number[], c:TAppointmentTemp)=>[...p, c.apptmId || -1], [])
        this.updateTeller(apptmIds, result.tellId || -1)*/
      }
    });
  }

  openDialogAddComment(): boolean {
    const dialogRef = this.dialog.open(CommentCallComponent, {
      panelClass: 'dialog',
      data: {
        row: this.tAppointmentTemp,
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });

    dialogRef.afterClosed().subscribe((result:AppointmentTemp) => {
      if(result){
        result.apptmState=APPOINTMENT_STATE.ATTENDED;
        this.finalizeCall(this.tAppointmentTemp?.apptmId || -1, result)
      }
    });
    return false;
  }
  //api
  public startCallByTeller(tellId:number, apptmId?:number){
    this.isLoading=true;

    this.appointmentTempService.startCallByTeller(tellId,apptmId).subscribe({
      next:d=>{
        console.log(d)
        this.isLoading=false
        const t=d.data as TAppointmentTemp[];
        if(t.length>0){
          this.tAppointmentTemp=t[0]
          this.fwlService.diminish()
          
          this.returnValue()
          this.setSocketTV(this.tAppointmentTemp.hqId||-1, {action:SOCKET_ACTION.TV_ADD_TARGET_CALL, data: this.tAppointmentTemp})
          //this.setTVAddTargetCall(this.tAppointmentTemp)
        }
        
      },
       error:er=>{

      }
    });
  }

  private getAttentionPendingByTeller(tellId:number){
    this.isLoading=true;
    this.appointmentTempService.getAttentionPendingByTeller(tellId).subscribe({
      next:d=>{
        this.isLoading=false
        const t=d.data as TAppointmentTemp[];
        if(t.length>0){
          this.tAppointmentTemp=t[0]
          console.log(this.tAppointmentTemp)
        }else{
            this.tAppointmentTemp=null 
        }
      }
    })
  }

  beforeCallAgain(){
    if(this.tAppointmentTemp)
    this.tAppointmentTemp.apptmNroCalls=(this.tAppointmentTemp?.apptmNroCalls || 0)+1
    const a=this.tAppointmentTemp
    if(a){
      this.callAgain(a.apptmId || -1)
      //this.setTVRefreshTargetCall(a);
      this.setSocketTV(a.hqId||-1,{action:SOCKET_ACTION.TV_REFRESH_TARGET_CALL, data: a})
    }
  }

  public callAgain(apptmId:number){
    this.appointmentTempService.callAgain(apptmId).subscribe({
      next: d=>{
        console.log(d)
      }
    })
  }

  public undoCall(apptmId:number){
    this.appointmentTempService.undoCall(apptmId).subscribe({
      next: d=>{
        console.log(d)
        this.fwlService.increase()
        this.returnValue()
        const hqId=this.tAppointmentTemp?.hqId || -1

        this.tAppointmentTemp=null

        this.setSocketTV(
          hqId,
          {
          action:SOCKET_ACTION.TV_REMOVE_TARGET_CALL, 
          data: {apptmId:apptmId}
        })

      }
    })
  }

  public finalizeCall(apptmId:number, appointmentTemp:AppointmentTemp){
    this.appointmentTempService.finalizeCall(apptmId, appointmentTemp ).subscribe({
      next: d=>{
        this.tAppointmentTemp=null
        console.log(d)
      }
    })
  }

  public transferCallToTeller(apptmId:number, tellId:number){
    this.appointmentTempService.transferCallToTeller(apptmId, tellId).subscribe({
      next:d=>{
        this.tAppointmentTemp=null
        this.showMessage.success({message:d.msg})
        this.returnValue()
      },   error:e=>{
        this.showMessage.error({message:e.error.message,  action: ()=>this.transferCallToTeller(apptmId, tellId)})
      }
    })
  }

/*  private setTVRefreshTargetCall(appointmentTemp:AppointmentTemp){
    this.waitingLineService.setTVRefreshTargetCall(appointmentTemp);
  }*/


  private setSocketTV(hqId:number,s:SocketInterface<AppointmentTemp>){
      this.waitingLineService.setSocketTV(hqId,s)

  }

  /*private setTVAddTargetCall(appointmentTemp:AppointmentTemp){
    this.waitingLineService.setTVAddTargetCall(appointmentTemp);
  }*/


  


}
