import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketDispensingComponent} from './ticket-dispensing/ticket-dispensing.component'
const routes: Routes = [
  {
    path:'',
    component: TicketDispensingComponent,
    children:[
      {path:'asdf', component: TicketDispensingComponent},

      {}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketDispensingRoutingModule { }
