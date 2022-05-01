import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadquartersRoutingModule } from './headquarters-routing.module';
import { HeadquartersComponent } from './headquarters.component';


import {MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';

import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ChronometerModule } from 'src/app/shared/components/chronometer/chronometer.module';
import { EditComponent } from './pages/edit/edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    HeadquartersComponent,
    EditComponent
  ],
  imports: [

    CommonModule,
    HeadquartersRoutingModule,
    CommonModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    MatListModule, 
    MatMenuModule, 
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule, 
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ChronometerModule,
    FormsModule,
     ReactiveFormsModule,
     MatToolbarModule,
     MatInputModule,
     MatFormFieldModule
     
  ]
})
export class HeadquartersModule { }


