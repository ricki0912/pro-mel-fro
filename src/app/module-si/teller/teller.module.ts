import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TellerComponent } from './teller.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatTableModule } from '@angular/material/table';
import { TellerRoutingModule } from './teller-routing.module';

import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';

import {MatPaginatorModule} from '@angular/material/paginator';

import {MatCheckboxModule} from '@angular/material/checkbox';


import {MatDialogModule} from '@angular/material/dialog';


import {MatToolbarModule} from '@angular/material/toolbar';

import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatListModule} from '@angular/material/list';
import { EditComponent } from './pages/edit/edit.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CardTellerComponent } from './pages/card-teller/card-teller.component';
import {MatChipsModule} from '@angular/material/chips';
import { FindTellerComponent } from './pages/find-teller/find-teller.component';


@NgModule({
  declarations: [
    TellerComponent,
    EditComponent,
    CardTellerComponent,
    FindTellerComponent
  ],
  imports: [
    TellerRoutingModule,
   
    MatMenuModule,

    MatChipsModule,
    
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,

    MatDialogModule,
    MatToolbarModule,
    MatIconModule,

    MatInputModule,
    FlexLayoutModule,
    MatMenuModule,

    MatListModule,
    MatProgressSpinnerModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [
    TellerComponent,
  ]
})
export class TellerModule { }
