import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodRoutingModule } from './period-routing.module';
import { PeriodComponent } from './period.component';
import { EditComponent } from './pages/edit/edit.component';


import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FindPeriodComponent } from './pages/find-period/find-period.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    PeriodComponent,
    EditComponent,
    FindPeriodComponent
  ],
  imports: [
    CommonModule,
    PeriodRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule
    
  ]
})
export class PeriodModule { }
