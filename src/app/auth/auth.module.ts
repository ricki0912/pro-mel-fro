import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatCardModule } from '@angular/material/card';
import {MatFormFieldModule, } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';



import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,    
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule, 
    ReactiveFormsModule 
  ], exports: [
    
    LoginComponent, 
    
  ]

})
export class AuthModule {

 }
