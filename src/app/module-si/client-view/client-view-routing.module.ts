import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientViewComponent } from './client-view.component';

const routes:Routes=[
  {
    path: '',
    component: ClientViewComponent,

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
export class ClientViewRoutingModule { }
