import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientViewRoutingModule } from './client-view-routing.module';
import { ClientViewComponent } from './client-view.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    ClientViewComponent
  ],
  imports: [
    CommonModule,
    ClientViewRoutingModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class ClientViewModule { }
