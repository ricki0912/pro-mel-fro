import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { GlobalHelpers } from 'src/app/global/helpers/global.helpers';
import { AppointmentTemp } from 'src/app/interfaces/appointment-temp';
import { Period } from 'src/app/interfaces/period';
import { PeriodPayment } from 'src/app/interfaces/period-payment';
import { Services } from 'src/app/interfaces/services';
import { ServicesProvided } from 'src/app/interfaces/services-provided';
import { ServicesProvidedService } from 'src/app/services/services-provided.service';


@Component({
  selector: 'app-detail-services-provided',
  templateUrl: './detail-services-provided.component.html',
  styleUrls: ['./detail-services-provided.component.scss']
})
export class DetailServicesProvidedComponent implements OnInit {
  public _serviceProvided?:ServicesProvided
  constructor(
    private router:Router,
    private servicesProvided:ServicesProvidedService,
    private currentUser:TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public params: { serviceProvided:ServicesProvided,  services:Services[], periodPayments: PeriodPayment[]},

  ) { }

  ngOnInit(): void {
    if(this.params.serviceProvided.spId)
    this.getPayments(this.params.serviceProvided.spId)
  }

  formatDate=(date:Date)=>GlobalHelpers.formatDateAndHour(date)
  calcWidth=(firstNumber?:number, totalNumber?:number):number=>((firstNumber|| 0)/( totalNumber ||0))*100
  
  getPayments=(spId:number)=>{
    console.log("hola")
    this.servicesProvided.getPayments(spId).subscribe({
      next:d=>{this._serviceProvided=d.data as ServicesProvided; 
      console.log("Services ", d)}
    })
  }

  joinCodeTicket(element: AppointmentTemp) {
    return element.catCode + String(element.apptmNro).padStart(2, '0')
  }

  private openInNewWindow(urls:string){

    const url = this.router.serializeUrl(
      this.router.createUrlTree([urls])
  );
    
    window.open(url, '_blank');
  }
  openDetailAppointmentInNewWindow=(apptmId:number)=>  this.openInNewWindow(`si/${this.currentUser.getHqId()}/reports/waiting-line/${apptmId}`)
  openDetailPaymentInNewWindow=(payToken:string)=>  this.openInNewWindow(`si/${this.currentUser.getHqId()}/accounting/${payToken}`)
  

}
