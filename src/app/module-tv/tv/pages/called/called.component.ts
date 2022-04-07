import { Component, OnInit } from '@angular/core';
import { TAppointmentTemp } from 'src/app/interfaces/appointment-temp';
import { AppointmentTempService } from 'src/app/services/appointment-temp.service';
import { WaitingLineService } from 'src/app/socket/waiting-line.service';

@Component({
  selector: 'app-called',
  templateUrl: './called.component.html',
  styleUrls: ['./called.component.scss']
})
export class CalledComponent implements OnInit {
  tAppointmentTemps:TAppointmentTemp[]=[]
  
  constructor(
    private appointmentTempService: AppointmentTempService,
    private waitingLineService: WaitingLineService

  ) { }

  ngOnInit(): void {
    this.getAttentionNoPending(10);
    this.getTVRefreshTargetCall()
    this.getTVAddTargetCall()
  }


  public getAttentionNoPending(limit:number){
    this.appointmentTempService.getAttentionNoPending(limit).subscribe({
      next:d=>{
        this.tAppointmentTemps=d.data as TAppointmentTemp[]
        console.log(d)
      }
    
    })
  }

  /*llamar socket refresh */
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

   
  

  

}
