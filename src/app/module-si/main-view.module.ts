import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

import {MatDialogModule} from '@angular/material/dialog';



import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatMenuModule } from '@angular/material/menu';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MainViewRoutingModule } from './main-view-routing.module';
import {MatSelectModule} from '@angular/material/select';


/**Cli */

import { MainViewComponent } from './main-view/main-view.component';
import { SearchClientComponent } from './main-view/pages/search-client/search-client.component';
import { MatBadgeModule } from '@angular/material/badge';
import { FloatingWaitingLineComponent } from './main-view/pages/floating-waiting-line/floating-waiting-line.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { ChronometerModule } from '../shared/components/chronometer/chronometer.module';
import { AuthModuleSIInterceptor } from '../core/http/auth-module-si.interceptor';

import { CoreModule } from '../core/core.module';
import { SelectHeadquarterComponent } from './main-view/pages/select-headquarter/select-headquarter.component';
import { MainViewService } from './main-view/main-view.service';


@NgModule({
  declarations: [
    MainViewComponent,
    SearchClientComponent,
    FloatingWaitingLineComponent,
    SelectHeadquarterComponent,
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
    MatBadgeModule,
    OverlayModule,
    ChronometerModule,
    MatDialogModule,
    MatSelectModule,
    CoreModule,
    

  ],
  exports: [
    MainViewComponent
    

  ],
  providers: [MainViewService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthModuleSIInterceptor, 
      multi: true
    }
],
})
export class MainViewModule { }
