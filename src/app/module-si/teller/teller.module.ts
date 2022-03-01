import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TellerComponent } from './teller.component';


import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {A11yModule} from '@angular/cdk/a11y';


import { MatMenuModule} from '@angular/material/menu';


import {FlatTreeControl} from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';




import { MatButtonModule } from '@angular/material/button';

import { MatTableModule } from '@angular/material/table';
import { TellerRoutingModule } from './teller-routing.module';

@NgModule({
  declarations: [
    TellerComponent
  ],
  imports: [
    TellerRoutingModule,
    CommonModule,


    CdkTreeModule,
    A11yModule,
    CdkTableModule,
    ScrollingModule,
    DragDropModule,

    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
    
  ],
  exports: [
    TellerComponent,
  ]
})
export class TellerModule { }
