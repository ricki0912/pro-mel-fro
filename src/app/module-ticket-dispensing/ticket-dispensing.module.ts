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
import { AlertComponent } from './ticket-dispensing/pages/alert/alert.component';
import { DatePipe } from '@angular/common';
import { BottomMenuComponent } from './ticket-dispensing/pages/bottom-menu/bottom-menu.component'

import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import { FindBusinessComponent } from './ticket-dispensing/pages/find-business/find-business.component';
import { FindBusiness2Component } from './ticket-dispensing/pages/find-business2/find-business2.component';

import { MatDialogModule } from '@angular/material/dialog';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { KeyboardAlphabetComponent } from './ticket-dispensing/pages/keyboard-alphabet/keyboard-alphabet.component';
import { ControlButtonsComponent } from './ticket-dispensing/pages/control-buttons/control-buttons.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    TicketDispensingComponent,
    HeadComponent,
    KeyboardComponent,
    BodyComponent,
    ListCategoryComponent,
    LoadingComponent,
    AlertComponent,
    BottomMenuComponent,
    FindBusinessComponent,
    KeyboardAlphabetComponent,
    ControlButtonsComponent,
    FindBusiness2Component
  
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
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatListModule,
    MatDialogModule,
    MatToolbarModule,
    MatTableModule,
    ScrollingModule

  ],
  providers: [DatePipe]

})
export class TicketDispensingModule { }
