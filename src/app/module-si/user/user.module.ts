import {UserComponent} from './user.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';


import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';



import {MatDialogModule} from '@angular/material/dialog';

import { RouterModule } from '@angular/router';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule } from '@angular/material/icon';

import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';

import {MatListModule} from '@angular/material/list';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

//import {MatGridListModule} from '@angular/material/grid-list';

import { EditComponent } from './pages/edit/edit.component';
import { FindUserComponent } from './pages/find-user/find-user.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { RolesComponent } from './pages/roles/roles.component';



@NgModule({
  declarations: [
    UserComponent,
    EditComponent,
    FindUserComponent,
    ChangePasswordComponent,
    RolesComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,


    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class UserModule { }
