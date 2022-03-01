import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TellerComponent } from './teller.component';

const routes:Routes=[
  {
    path: '',
     component: TellerComponent,

    children:[
      {path:'teller', component: TellerComponent},

      {path: '**', redirectTo: 'login '}
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)

  ]
})
export class TellerRoutingModule { }
