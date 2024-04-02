import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { StatementRoutingModule } from './statement-routing.module';
import { StatementComponent } from './statement.component';




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
import { MatMomentDateModule } from '@angular/material-moment-adapter';


//import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { MatFormFieldModule } from '@angular/material/form-field';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MiniCardTcardTaskComponent } from './pages/mini-card-tcard-task/mini-card-tcard-task.component';

import {ClientViewModule } from 'src/app/module-si/client-view/client-view.module'
import {MatTabsModule} from '@angular/material/tabs';
import { SummaryComponent } from './pages/summary/summary.component';
import { StatementsComponent } from './pages/statements/statements.component';


@NgModule({
  declarations: [
    StatementComponent,
    MiniCardTcardTaskComponent,
    SummaryComponent,
    StatementsComponent
  ],
  imports: [
    CommonModule,
    StatementRoutingModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
    ClientViewModule,
    MatMenuModule,
    MatTabsModule
  ],
  providers:[  DatePipe,     ],

})
export class StatementModule { }
