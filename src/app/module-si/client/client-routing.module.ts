import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
const routes:Routes=[
  {
    path: '',
    component: ClientComponent,

    children:[
      {path:'loFASDFgin', component: ClientComponent},

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
export class ClientRoutingModule { }
