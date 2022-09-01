import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodayRoutingModule } from './today-routing.module';
import { TodayComponent } from './today.component';
import { CounterCardsComponent } from './pages/counter-cards/counter-cards.component';
import { CounterCardComponent } from './pages/counter-card/counter-card.component';


@NgModule({
  declarations: [
    TodayComponent,
    CounterCardsComponent,
    CounterCardComponent
  ],
  imports: [
    CommonModule,
    TodayRoutingModule
  ]
})
export class TodayModule { }
