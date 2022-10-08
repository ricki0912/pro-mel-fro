import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { GlobalHelpers } from 'src/app/global/helpers/global.helpers';
import { Appointment } from 'src/app/interfaces/appointment';
import { Bussines } from 'src/app/interfaces/bussines';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ClientViewService } from '../../client-view.service';

@Component({
  selector: 'app-last-appointment',
  templateUrl: './last-appointment.component.html',
  styleUrls: ['./last-appointment.component.scss']
})
export class LastAppointmentComponent implements OnInit {
  appointments:Appointment[]=[]
  serBuss: Bussines | undefined;

  constructor(
    private appointmentService:AppointmentService,
    private clientViewService:ClientViewService,
    private router:Router, 
    private currentUserService: TokenStorageService

  ) { }

  ngOnInit(): void {

    this.listenSelectedBusiness(()=>{this.lastAppointment(this.serBuss?.bussId|| 0, 4/*LIMITE DE 2 */)})
    
  }

  private listenSelectedBusiness(o:()=>void){
    this.clientViewService.getSelectedBussines().subscribe((b:Bussines | null)=>{
      if(b){
        this.serBuss=b;
        o();
    }
    })
  }
  lastAppointment(bussId:number, limit:number ){
    this.appointmentService.getAllBy(0,0,0,0,'','',bussId,limit).subscribe({
      next: d=>{
        this.appointments=d.data as Appointment[]
      }
    })
  }


  formatDate=(d:Date)=>GlobalHelpers.formatDateAndHour(d)
  openDetailAppointmentInNewWindow=(apptmId:number)=>  GlobalHelpers.openInNewWindow (`si/${this.currentUserService.getHqId()}/reports/waiting-line/${apptmId}`, this.router)


}
