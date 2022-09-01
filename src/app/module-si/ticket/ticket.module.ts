import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketComponent  } from './ticket.component';

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
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    TicketComponent, 
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    MatListModule, 
    MatMenuModule, 
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule, 
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    TicketRoutingModule,
    ChronometerModule,
    MatPaginatorModule,
    MatChipsModule
  ]
})
export class TicketModule { }
