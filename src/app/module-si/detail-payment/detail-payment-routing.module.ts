import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPaymentComponent } from './detail-payment.component';

const routes: Routes = [
  {
    path: '',
     component: DetailPaymentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailPaymentRoutingModule { }
