import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdServicesRoutingModule } from './md-services-routing.module';
import { MdServicesComponent } from './md-services.component';
import { EditServiceComponent } from './pages/edit-service/edit-service.component';

import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { OrganizeServicesComponent } from './pages/organize-services/organize-services.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    MdServicesComponent,
    EditServiceComponent,
    OrganizeServicesComponent
  ],
  imports: [
    CommonModule,
    MdServicesRoutingModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatTableModule,
    MatButtonModule,

    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    DragDropModule
  ]
})
export class MdServicesModule { }
