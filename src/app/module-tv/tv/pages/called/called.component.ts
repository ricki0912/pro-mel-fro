import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketInterface, SOCKET_ACTION } from 'src/app/global/parents/socket.interface';
import { AppointmentTemp, TAppointmentTemp } from 'src/app/interfaces/appointment-temp';
import { AppointmentTempService } from 'src/app/services/appointment-temp.service';
import { WaitingLineService } from 'src/app/socket/waiting-line.service';

@Component({
  selector: 'app-called',
  templateUrl: './called.component.html',
  styleUrls: ['./called.component.scss']
})
export class CalledComponent implements OnInit {
  private hqId:number=0
  tAppointmentTemps:TAppointmentTemp[]=[]
  soundAlertC=new Audio('assets/sounds/sound02l.mp3')
  limit = 0;

  constructor(
    private appointmentTempService: AppointmentTempService,
    private waitingLineService: WaitingLineService,
    private activatedRouted:ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.listenRoute(o=>{this.getAttentionNoPending(o,5); this.getSocketTV(o)})
    
    this.soundAlertC.muted = true; 

    //this.getTVRefreshTargetCall()
    //this.getTVAddTargetCall()
  }

  private listenRoute(c:(o:any)=>void){
    this.activatedRouted.params.subscribe(params=>{

      this.hqId=parseInt(params['hqId'] || 0)
      c(this.hqId)
    });
  }


  public getAttentionNoPending(hqId:number,limit:number){
    this.appointmentTempService.getAttentionNoPendingByHQ(hqId,limit).subscribe({
      next:d=>{
        this.tAppointmentTemps=d.data as TAppointmentTemp[]
        console.log(d)
        this.soundAlertC.muted = false; 

      }
    
    })
  }

  /*llamar socket refresh */
  
  public getSocketTV(hqId:number){
      this.waitingLineService.getSocketTV(hqId).subscribe({
        next:d=>{
          const action=d.action
          switch(action){
            case SOCKET_ACTION.TV_ADD_TARGET_CALL:
              this.addTargetCall(d.data as AppointmentTemp)
              break;
            case SOCKET_ACTION.TV_REFRESH_TARGET_CALL:
              this.refreshTargetCall(d.data as AppointmentTemp)
              break;
            case SOCKET_ACTION.TV_REMOVE_TARGET_CALL:
              this.removeTargetCall(d.data as AppointmentTemp)
              break;
            default:
              break;

          }

        }
      })
  }


  public refreshTargetCall(s:AppointmentTemp){
 
    const index = this.tAppointmentTemps.map(function(e) { return e.apptmId; }).indexOf(s.apptmId);
    this.tAppointmentTemps[index]=s as TAppointmentTemp

    console.log(index, this.tAppointmentTemps[index].apptmNroCalls)
    this.soundAlertC.play()
    //this.playNotification()
    
  }

  public addTargetCall(s:AppointmentTemp){
    console.log("ADD APPTM", s)
    this.soundAlertC.play()
    if(this.tAppointmentTemps[5]){
      this.tAppointmentTemps.pop();
    }
    this.tAppointmentTemps.unshift(s as TAppointmentTemp)
  }

  public removeTargetCall(s:AppointmentTemp){
    const index=this.tAppointmentTemps.map((e)=>e.apptmId).indexOf(s.apptmId);
    console.log("remove targer call", index)
    this.tAppointmentTemps.splice(index,1)
  }
  
  private playNotification(){
    if(this.limit>0){
      this.limit=5;
      return;
  }
    
    console.log(this.limit)
    const delay = 1;
    let i = 1;
    

    console.log('START!');

    const limitedInterval = setInterval(() => {
      this.soundAlertC.play()

      console.log(`message ${i}, appeared after ${delay * i++} seconds`);
      
      if (this.limit) {
        this.limit-=1;
        clearInterval(limitedInterval);

        console.log('interval cleared!');
      }
    }, delay * 1000);
  }
  
/*
  public getTVRefreshTargetCall(){
    this.waitingLineService.getTVRefreshTargetCall().subscribe({
      next:d=>{
        
        const index = this.tAppointmentTemps.map(function(e) { return e.apptmId; }).indexOf(d.apptmId);
        this.tAppointmentTemps[index]=d as TAppointmentTemp

        console.log(index, this.tAppointmentTemps[index].apptmNroCalls)
        //this.tAppointmentTemps.filter(a=>a.apptmId==d.apptmId)[0].apptmNroCalls=((d.apptmNroCalls || 0 )+1)
        
        
      }
    });
  }

  private getTVAddTargetCall(){
    this.waitingLineService.getTVAddTargetCall().subscribe({
      next: d=>{
        console.log("ADD APPTM", d)
        this.tAppointmentTemps.unshift(d as TAppointmentTemp)
      }
    })
  }
*/
   
  

  

}
