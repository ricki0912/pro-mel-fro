import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementPendingsAndObservedsRoutingModule } from './statement-pendings-and-observeds-routing.module';
import { StatementPendingsAndObservedsComponent } from './statement-pendings-and-observeds.component';

import { PendingAndObservedComponent } from './pages/pending-and-observed/pending-and-observed.component';
import { PendingsComponent } from './pages/pendings/pendings.component';
import { ObservedComponent } from './pages/observed/observed.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { ClientViewModule } from '../client-view/client-view.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    StatementPendingsAndObservedsComponent,
    PendingAndObservedComponent,
    PendingsComponent,
    ObservedComponent,
  ],
  imports: [
    CommonModule,
    StatementPendingsAndObservedsRoutingModule,


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
  ]
})
export class StatementPendingsAndObservedsModule { }
