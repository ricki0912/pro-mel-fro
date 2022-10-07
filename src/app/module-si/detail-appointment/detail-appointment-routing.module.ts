import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailAppointmentComponent } from './detail-appointment.component';

const routes:Routes=[
  {
    path: '',
    component: DetailAppointmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailAppointmentRoutingModule { }
