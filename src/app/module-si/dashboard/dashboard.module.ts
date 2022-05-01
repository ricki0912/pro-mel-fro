import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CounterCardsComponent } from './pages/counter-cards/counter-cards.component';
import { CounterCardComponent } from './pages/counter-card/counter-card.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CounterCardsComponent,
    CounterCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
