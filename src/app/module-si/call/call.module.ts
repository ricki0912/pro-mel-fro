import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallRoutingModule } from './call-routing.module';
import { CallComponent } from './call.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    CallComponent
  ],
  imports: [
    CommonModule,
    CallRoutingModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    /*Tabla*/
    MatCheckboxModule,
    MatTableModule
  ]
})
export class CallModule { }
