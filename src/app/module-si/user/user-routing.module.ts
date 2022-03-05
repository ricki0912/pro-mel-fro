import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';

const routes:Routes=[
  {
    path: '',
     component: UserComponent,

    children:[
      {path:'teller', component: UserComponent},

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
export class UserRoutingModule { }
