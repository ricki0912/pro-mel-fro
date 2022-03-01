import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes:Routes=[
  {
    path: '',
    
    children:[
      {path:'login', component: LoginComponent},

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
export class AuthRoutingModule { }
