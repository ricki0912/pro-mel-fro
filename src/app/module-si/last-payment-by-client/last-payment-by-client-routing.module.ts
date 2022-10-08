import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastPaymentByClientComponent } from './last-payment-by-client.component';

const routes: Routes = [
  {
    path:'',
    component: LastPaymentByClientComponent
  },
  {

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LastPaymentByClientRoutingModule { }
