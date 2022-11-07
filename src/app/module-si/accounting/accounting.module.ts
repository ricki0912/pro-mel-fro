import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
import { SatPopoverModule } from '@ncstate/sat-popover';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddUnitPriceComponent } from './pages/add-unit-price/add-unit-price.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
//import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';


import {MatExpansionModule} from '@angular/material/expansion';
import { AddDescriptionComponent } from './pages/add-description/add-description.component';
import { AddQuantityComponent } from './pages/add-quantity/add-quantity.component';

import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  declarations: [
    AddUnitPriceComponent,
    AccountingComponent,
    ProofOfPaymentComponent,
    AddDescriptionComponent,
    AddQuantityComponent
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
    MatSelectModule,
    SatPopoverModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCheckboxModule,
    MatRadioModule
    
  ],
  providers:[  DatePipe,     ],

})
export class AccountingModule { }
