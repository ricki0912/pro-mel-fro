import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { APPOINTMENT_STATE } from 'src/app/interfaces/appointment-temp';
import { AppointmentTempService } from 'src/app/services/appointment-temp.service';
import { FloatingWaitingLineService } from './floating-waiting-line.service';
import { WaitingLineService } from 'src/app/socket/waiting-line.service';
import { SocketInterface, SOCKET_ACTION } from 'src/app/global/parents/socket.interface';

@Component({
  selector: 'app-floating-waiting-line',
  templateUrl: './floating-waiting-line.component.html',
  styleUrls: ['./floating-waiting-line.component.scss']
})
export class FloatingWaitingLineComponent implements OnInit {
  isOpen = false;
  title :string= 'Melendres Auditores'
  nroCallPending:number=0

  soundAlert=new Audio('assets/sounds/sound03s.mp3')

  currentUser: any;

  selectedTeller?:number
  constructor(
    private fwlService:FloatingWaitingLineService,
    private appointmentTempService: AppointmentTempService,
    private titleService:Title,
    private tokenService: TokenStorageService,
    private waitingLineService:WaitingLineService

  ) {
    this.currentUser = this.tokenService.getUser();
    if(this.currentUser)
    this.selectedTeller= this.currentUser.user.tellers[0]?.tellId || -1
   }

  ngOnInit(): void {
    //this.titleService.setTitle('+ this.title)
   this.fwlService.onNotification.subscribe(d=>{
   }) 
   
   this.getNroPending(APPOINTMENT_STATE.PENDING, this.selectedTeller || -1);

   this.getSocketWaitingLine(this.selectedTeller || -1)
   this.soundAlert.muted = true; 

  }

  private getNroPending(apptmState:number, tellId:number){
    this.appointmentTempService.getNroTotal(apptmState, tellId).subscribe({
      next: d=>{
        const data=d.data as any[];
        this.nroCallPending=data[0].nroTotal
        this.setTitlePage(this.nroCallPending)
          this.soundAlert.muted = false; 

      }
    })
    //this.appointmentTempService.getNroTotal(APPOINTMENT_STATE.PENDING);
  }

  private setTitlePage(nroCallPending:number){
    if(nroCallPending==0){
      this.titleService.setTitle(this.title)
    }else {
      this.titleService.setTitle('('+nroCallPending+') '+ this.title)
    }
  }
  getSocketWaitingLine (tellId:number){
    console.log("BEFORE -SOCKET -WAITING ", tellId)

  this.waitingLineService.getSocketWaitingLine(tellId).subscribe({
    next:d=>{
      console.log("SOCKET -WAITING ", d)
      const action=d.action;
      switch (action) {
        case SOCKET_ACTION.WAITING_LINE_ADD_APPOINTMENT:
            this.showNotification()
          break;
      
        default:
          break;
      }
    }
  })
}

private showNotification(){
            this.nroCallPending+=1
            this.setTitlePage(this.nroCallPending)
            this.soundAlert.play()
}

}
