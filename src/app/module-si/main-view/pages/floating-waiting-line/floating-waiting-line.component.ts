import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { AppointmentTemp, APPOINTMENT_STATE, TAppointmentTemp } from 'src/app/interfaces/appointment-temp';
import { AppointmentTempService } from 'src/app/services/appointment-temp.service';
import { FloatingWaitingLineService, FWLS_CONTROL } from './floating-waiting-line.service';
import { WaitingLineService } from 'src/app/socket/waiting-line.service';
import { SocketInterface, SOCKET_ACTION } from 'src/app/global/parents/socket.interface';
import { CommentCallComponent } from 'src/app/module-si/call/pages/comment-call/comment-call.component';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { GlobalHelpers } from 'src/app/global/helpers/global.helpers';

@Component({
  selector: 'app-floating-waiting-line',
  templateUrl: './floating-waiting-line.component.html',
  styleUrls: ['./floating-waiting-line.component.scss']
})
export class FloatingWaitingLineComponent implements OnInit {
  @Input() isFloating: boolean =true

  isLoading = false;
  isOpen = false;
  title: string = 'Melendres Auditores'
  nroCallPending: number = 0
  soundAlert = new Audio('assets/sounds/sound03s.mp3')
  private currentUser: User;
  tAppointmentTemp: TAppointmentTemp | null = null
  tAppointmentTemps: TAppointmentTemp[] = []

  selectedCategory=0

  selectedTeller: number = -1

  colorBackground:{r:number, g:number, b:number, a:number}={r:0,g:255,b:0,a:0.4}
  constructor(
    private fwlService: FloatingWaitingLineService,
    private appointmentTempService: AppointmentTempService,
    private titleService: Title,
    private tokenService: TokenStorageService,
    private waitingLineService: WaitingLineService,
    private dialog: MatDialog,
    private showMessage:ShowMessageService,


  ) {
    this.currentUser = this.tokenService.getUser() as User;
    if (this.currentUser.tellers) {
      for (let e of this.currentUser.tellers) {
        this.selectedTeller = e.tellId || -1
        console.log("HOlaaaa")
      }
    }
  }

  ngOnInit(): void {


    //this.titleService.setTitle('+ this.title)
    this.fwlService.onControl.subscribe(d => {
      switch (d) {
        case FWLS_CONTROL.DIMINISH:
          this.nroCallPending--
          break;
        case FWLS_CONTROL.HIDE:
          this.isOpen = false
          break;
        case FWLS_CONTROL.HIDE:
          this.isOpen = true
          break;
        case FWLS_CONTROL.INCREASE:
          this.nroCallPending++
          break;
      }
    })

  
    this.getNroPending(APPOINTMENT_STATE.PENDING, this.selectedTeller || -1);

    this.getSocketWaitingLine(this.selectedTeller || -1)
    this.soundAlert.muted = true;
    this.getCurrentAttention()
    this.getTAppointmentTemps()
    this.getAttentionPendingByTeller(this.selectedTeller)
    this.selectSearch()
    
  }

  private getTAppointmentTemps(){
    this.fwlService.getTAppointmentTemps().subscribe({
      next:(d)=>{
        this.tAppointmentTemps=d 
      },
      error:(e)=>{

      }
    })
}
  
  private getCurrentAttention(){
    this.fwlService.getCurrentAttion().subscribe({
      next:(d)=>{
        this.tAppointmentTemp=d 
      },
      error:(e)=>{

      }
    })
}

  joinCodeTicket(element: TAppointmentTemp) {
    return element.catCode + String(element.apptmNro).padStart(2, '0')


  }

  beforeCall() {
    this.isOpen = !this.isOpen
    if (this.currentUser && this.isOpen) {
      this.tAppointmentTemp = null
      this.getAttentionPendingByTeller(this.selectedTeller)
      console.log("Holassssss")
    }
  }

  openDialogAddComment(): boolean {
    const dialogRef = this.dialog.open(CommentCallComponent, {
      panelClass: 'dialog',
      data: {
        row: this.tAppointmentTemp,
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });

    dialogRef.afterClosed().subscribe((result: AppointmentTemp) => {
      if (result) {
        result.apptmState = APPOINTMENT_STATE.ATTENDED;
        this.finalizeCall(this.tAppointmentTemp?.apptmId || -1, result)
      }
    });
    return false;
  }


  private getAttentionPendingByTeller(tellId: number) {
    this.isLoading = true;
    this.appointmentTempService.getAttentionPendingByTeller(tellId).subscribe({
      next: d => {
        this.isLoading = false
        const t = d.data as TAppointmentTemp[];
        if (t.length > 0)
          this.fwlService.onCurrentAttention(t[0])
          //this.tAppointmentTemp = t[0]
        

      }
    })
  }

  public startCallByTeller(tellId: number, apptmId?: number) {
    this.isLoading = true;

    this.appointmentTempService.startCallByTeller(tellId, apptmId).subscribe({
      next: d => {
        console.log(d)
        this.isLoading = false
        const t = d.data as TAppointmentTemp[];
        if (t.length > 0) {
          //this.tAppointmentTemp = t[0]
          this.fwlService.onCurrentAttention(t[0])
          this.nroCallPending = -1
          this.setSocketTV(t[0].hqId || -1, { action: SOCKET_ACTION.TV_ADD_TARGET_CALL, data: this.tAppointmentTemp })
          //this.setTVAddTargetCall(this.tAppointmentTemp)
          this.selectSearch()

        }else{
          this.showMessage.success({message:'No tenemos más clientes en espera.'})

        }

      },
      error: er => {

      }
    });
  }

  public finalizeCall(apptmId: number, appointmentTemp: AppointmentTemp) {
    this.appointmentTempService.finalizeCall(apptmId, appointmentTemp).subscribe({
      next: d => {
        this.fwlService.onCurrentAttention(null)

        //this.tAppointmentTemp = null
        console.log(d)
      }
    })
  }

  //consulta a base de datos

  private getNroPending(apptmState: number, tellId: number) {
    console.log("id teller", tellId)
    this.appointmentTempService.getNroTotal(apptmState, tellId).subscribe({
      next: d => {
        const data = d.data as any[];
        this.nroCallPending = data[0].nroTotal
        this.setTitlePage(this.nroCallPending)
        this.soundAlert.muted = false;
      }
    })
    //this.appointmentTempService.getNroTotal(APPOINTMENT_STATE.PENDING);
  }


  beforeCallAgain() {
    if (this.tAppointmentTemp)
      this.tAppointmentTemp.apptmNroCalls = (this.tAppointmentTemp?.apptmNroCalls || 0) + 1
    const a = this.tAppointmentTemp
    if (a) {
      this.callAgain(a.apptmId || -1)
      //this.setTVRefreshTargetCall(a);
      this.setSocketTV(a.hqId || -1, { action: SOCKET_ACTION.TV_REFRESH_TARGET_CALL, data: a })
    }
  }

  public callAgain(apptmId: number) {
    this.appointmentTempService.callAgain(apptmId).subscribe({
      next: d => {
        console.log(d)
      }
    })
  }

  private setTitlePage(nroCallPending: number) {
    if (nroCallPending == 0) {
      this.titleService.setTitle(this.title)
    } else {
      this.titleService.setTitle('(' + nroCallPending + ') ' + this.title)
    }
  }

/*
  private readAppointmentTempCRUD(hqId:number,tellId:number, catId:number,apptmState:number): boolean {
    this.isLoading = true;
    this.appointmentTempService.getAllBy(hqId,tellId, catId,apptmState).subscribe({
      next: (r) => {
        console.log("read ticket ", r)
        let data=r.data as TAppointmentTemp[]
        this.fwlService.onTAppointmentTemps(data)
        //this.isLoading = false;
        //this.dataSource.data = r.data as TAppointmentTemp[]
        //this.selection.clear() 

      },
      error: () => {
        
      }
    });

    return true
  }*/
  private selectSearch(){
    this.fwlService.readAppointmentTempsPendingOfMyTeller({})
    //this.readAppointmentTempCRUD(this.tokenService.getHqId() ,this.tokenService.getTeller()?.tellId || -1, this.selectedCategory, APPOINTMENT_STATE.PENDING)
    //if(this.currentTeller.tellId) this.readTeller(this.currentTeller.tellId)
  }

  getSocketWaitingLine(tellId: number) {

    this.waitingLineService.getSocketWaitingLine(tellId).subscribe({
      next: d => {
        const action = d.action;
        switch (action) {
          case SOCKET_ACTION.WAITING_LINE_ADD_APPOINTMENT:
            this.showNotification()
            this.selectSearch()
            break;
          default:
            break;
        }
      }
    })
  }


  private showNotification() {
    this.nroCallPending += 1
    this.setTitlePage(this.nroCallPending)
    this.soundAlert.play()

    
  }

  private setSocketTV(hqId: number, s: SocketInterface<AppointmentTemp>) {
    this.waitingLineService.setSocketTV(hqId, s)

  }


  public subStringName=(s:string)=>GlobalHelpers.subString(s,50)

}
