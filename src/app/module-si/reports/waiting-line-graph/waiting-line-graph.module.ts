import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { WaitingLineGraphRoutingModule } from './waiting-line-graph-routing.module';
import { WaitingLineGraphComponent } from './waiting-line-graph.component';

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
import { GrahpBussinesAndVisitorsComponent } from './pages/grahp-bussines-and-visitors/grahp-bussines-and-visitors.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { GraphTicketsByMonthComponent } from './pages/graph-tickets-by-month/graph-tickets-by-month.component';
@NgModule({
  declarations: [
    WaitingLineGraphComponent,
    GrahpBussinesAndVisitorsComponent,
    GraphTicketsByMonthComponent,
  ],
  imports: [
    CommonModule,
    WaitingLineGraphRoutingModule,

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

  ], providers:[DatePipe]
})
export class WaitingLineGraphModule { }
