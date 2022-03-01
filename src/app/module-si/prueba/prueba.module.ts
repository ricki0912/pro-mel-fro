import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PruebaComponent } from './prueba.component';

import {MatCardModule} from '@angular/material/card';

import {MatButtonModule} from '@angular/material/button';
import { PruebaRoutingModule } from './prueba-routing.module';



@NgModule({
  declarations: [
    PruebaComponent
  ],
  imports: [
    CommonModule,
    PruebaRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class PruebaModule { }
