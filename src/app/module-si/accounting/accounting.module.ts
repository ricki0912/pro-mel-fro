import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';
import { ProofOfPaymentComponent } from './pages/proof-of-payment/proof-of-payment.component';


import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';



import {MatDialogModule} from '@angular/material/dialog';

import { RouterModule } from '@angular/router';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule } from '@angular/material/icon';

import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';

import {MatListModule} from '@angular/material/list';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

//import {MatGridListModule} from '@angular/material/grid-list';





@NgModule({
  declarations: [
    AccountingComponent,
    ProofOfPaymentComponent
  ],
  imports: [
    CommonModule,
    AccountingRoutingModule,


    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class AccountingModule { }
