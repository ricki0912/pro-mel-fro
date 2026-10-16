import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuoteRequestComponent} from './quote-request.component'


const routes:Routes=[
  {
    path: '',
    component: QuoteRequestComponent,

    children:[
      //{path:'cli', component: ViewClientComponent},

      {path: '**', redirectTo: 'login '}
    ]

  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRequestRoutingModule { }
