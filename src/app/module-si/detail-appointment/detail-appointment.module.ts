import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailAppointmentRoutingModule } from './detail-appointment-routing.module';
import { DetailAppointmentComponent } from './detail-appointment.component';


@NgModule({
  declarations: [
    DetailAppointmentComponent
  ],
  imports: [
    CommonModule,
    DetailAppointmentRoutingModule
  ]
})
export class DetailAppointmentModule { }
