import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientViewComponent } from './client-view.component';
import { GeneralInformationComponent } from './pages/general-information/general-information.component';
import { ProofOfPaymentComponent } from './pages/proof-of-payment/proof-of-payment.component';
import { ServicesComponent } from './pages/services/services.component';

const routes:Routes=[
  {
    path: '',
    component: ClientViewComponent,

    children:[
      {path: '', component: GeneralInformationComponent},
      {path: 'services-provided', component: ServicesComponent},
      {path: 'proof-of-payment', component: ProofOfPaymentComponent},
     

      //{path:'cli', component: ViewClientComponent},

      {path: '**', redirectTo: 'login '}
    ]

  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientViewRoutingModule { }
