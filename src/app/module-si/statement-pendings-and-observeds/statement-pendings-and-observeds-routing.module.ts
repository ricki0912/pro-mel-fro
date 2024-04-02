import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatementPendingsAndObservedsComponent } from './statement-pendings-and-observeds.component';

const routes: Routes = [
  {
    path: '',
    component: StatementPendingsAndObservedsComponent,

    children:[
      //{path:'cli', component: ViewClientComponent},

      {path: '**', redirectTo: 'login '}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementPendingsAndObservedsRoutingModule { }
