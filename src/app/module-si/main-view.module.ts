import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatMenuModule } from '@angular/material/menu';

import { HttpClientModule } from '@angular/common/http'

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MainViewRoutingModule } from './main-view-routing.module';

/**Cli */

import { MainViewComponent } from './main-view/main-view.component';
import { SearchClientComponent } from './main-view/pages/search-client/search-client.component';



@NgModule({
  declarations: [
    MainViewComponent,
    SearchClientComponent,
  ],
  imports: [
    MainViewRoutingModule,

    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    RouterModule,

    MatAutocompleteModule,
    MatSlideToggleModule,
    FormsModule, ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    HttpClientModule,
    MatProgressBarModule,

  ],
  exports: [
    MainViewComponent,

  ]
})
export class MainViewModule { }
