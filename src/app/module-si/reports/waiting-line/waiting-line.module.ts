import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaitingLineRoutingModule } from './waiting-line-routing.module';
import { WaitingLineComponent } from './waiting-line.component';

import {MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';

import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ChronometerModule } from 'src/app/shared/components/chronometer/chronometer.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    WaitingLineComponent
  ],
  imports: [
    CommonModule,
    WaitingLineRoutingModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    

    
    MatCardModule,
    MatListModule, 
    MatMenuModule, 
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule, 
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    
    ChronometerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class WaitingLineModule { }
