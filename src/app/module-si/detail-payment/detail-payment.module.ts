import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailPaymentRoutingModule } from './detail-payment-routing.module';
import { DetailPaymentComponent } from './detail-payment.component';


@NgModule({
  declarations: [
    DetailPaymentComponent
  ],
  imports: [
    CommonModule,
    DetailPaymentRoutingModule
  ]
})
export class DetailPaymentModule { }
