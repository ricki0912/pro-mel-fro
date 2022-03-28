import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

import { TicketDispensingRoutingModule } from './ticket-dispensing-routing.module';
import { TicketDispensingComponent } from './ticket-dispensing/ticket-dispensing.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { HeadComponent } from './ticket-dispensing/pages/head/head.component';
import { KeyboardComponent } from './ticket-dispensing/pages/keyboard/keyboard.component';

import {MatButtonModule} from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BodyComponent } from './ticket-dispensing/pages/body/body.component';
import { ListCategoryComponent } from './ticket-dispensing/pages/list-category/list-category.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingComponent } from './ticket-dispensing/pages/loading/loading.component';


@NgModule({
  declarations: [
    TicketDispensingComponent,
    HeadComponent,
    KeyboardComponent,
    BodyComponent,
    ListCategoryComponent,
    LoadingComponent,
  
  ],
  imports: [
    CommonModule,
    TicketDispensingRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule

  ]
})
export class TicketDispensingModule { }
