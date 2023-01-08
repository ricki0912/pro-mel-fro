import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AccountingGraphRoutingModule } from './accounting-graph-routing.module';
import { AccountingGraphComponent } from './accounting-graph.component';



import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GrahpPayAndTellerComponent } from './pages/grahp-pay-and-teller/grahp-pay-and-teller.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { GraphBillingBalanceByMonthComponent } from './pages/graph-billing-balance-by-month/graph-billing-balance-by-month.component';

@NgModule({
  declarations: [
    AccountingGraphComponent,
    GrahpPayAndTellerComponent,
    GraphBillingBalanceByMonthComponent
  ],
  imports: [
    CommonModule,
    AccountingGraphRoutingModule,
    CommonModule,

    MatDividerModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatTabsModule, 
  
    NgxChartsModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  providers: [DatePipe]
})
export class AccountingGraphModule { }
