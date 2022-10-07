import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalHelpers } from 'src/app/global/helpers/global.helpers';
import { Appointment } from 'src/app/interfaces/appointment';
import { AppointmentTemp } from 'src/app/interfaces/appointment-temp';
import { Payment } from 'src/app/interfaces/payment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

@Component({
  selector: 'app-detail-appointment',
  templateUrl: './detail-appointment.component.html',
  styleUrls: ['./detail-appointment.component.scss']
})
export class DetailAppointmentComponent implements OnInit {
  //public payments?:Payment
    public appointment?: Appointment

  constructor(
    private showMessage:ShowMessageService,
    private loadingService:LoadingService,
    private activate : ActivatedRoute,
    private appointmentService:AppointmentService
  ) { }

  ngOnInit(): void {
    this.activate.params.subscribe((params)=>{
      //console.log(params)
      this.find(params['apptmId']);
    })
  }

  find(apptmId : number){
    this.loadingService.show()
    this.appointmentService.find(apptmId).subscribe({
      next: (d)=>{  

        this.appointment=d.data as Appointment
        console.log(this.appointment)
        this.loadingService.stop()

      }, 
      error: (e)=>{this.showMessage.error({message: 'Error '+e.error.message})}
    })
  }

  formatDate=(date:Date)=>GlobalHelpers.formatDateAndHour(date)
  convertSecondsToHHMMSS=(...s:number[])=>{ return GlobalHelpers.convertSecondsToHHMMSS(s.reduce((a,b)=>a+parseInt(String(b)), 0))}
  joinCodeTicket(element: AppointmentTemp) {  return element.catCode + String(element.apptmNro).padStart(2, '0')}
}
