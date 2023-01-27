import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { ClientViewComponent } from './client-view.component';
import { ClientViewRouteReuseStrategy } from './client-view.route-reuse-strategy';
import { GeneralInformationComponent } from './pages/general-information/general-information.component';
import { ProofOfPaymentComponent } from './pages/proof-of-payment/proof-of-payment.component';
import { ServicesComponent } from './pages/services/services.component';
import { TasksCompletedComponent } from './pages/tasks-completed/tasks-completed.component';

const routes:Routes=[
  {
    path: '',
    component: ClientViewComponent,

    children:[
      {path: '', component: GeneralInformationComponent},
      {path: 'services-provided', component: ServicesComponent},
      {path: 'proof-of-payment', component: ProofOfPaymentComponent},
      {path: 'tasks-completed', component: TasksCompletedComponent},
     

      //{path:'cli', component: ViewClientComponent},

      {path: '**', redirectTo: 'login '}
    ]

  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[
    {
      provide: RouteReuseStrategy, 
      useClass:ClientViewRouteReuseStrategy
    }
  ]
})
export class ClientViewRoutingModule { }
