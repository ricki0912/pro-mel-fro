import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallRoutingModule } from './call-routing.module';
import { CallComponent } from './call.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { ChronometerModule } from 'src/app/shared/components/chronometer/chronometer.module';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { CurrentAttentionComponent } from './pages/current-attention/current-attention.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommentCallComponent } from './pages/comment-call/comment-call.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SatPopoverModule } from '@ncstate/sat-popover';


@NgModule({
  declarations: [
    CallComponent,
    CurrentAttentionComponent,
    CommentCallComponent,
    
  ],
  imports: [
    CommonModule,
    CallRoutingModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    /*Tabla*/
    MatCheckboxModule,
    MatTableModule,
    ChronometerModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatProgressBarModule,
    MatToolbarModule,
    FormsModule, 
    ReactiveFormsModule,
    /*Crear module  */
    SatPopoverModule
  ]
})
export class CallModule { }
