import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MainViewModule } from './module-si/main-view.module';

import {MatSnackBar} from '@angular/material/snack-bar';
import { LoadingComponent } from './shared/components/loading/loading.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './core/http/api.interceptor';
import { ShowMessageComponent } from './shared/components/show-message/show-message.component';
import { MatSnackBarComponent } from './shared/components/show-message/components/mat-snack-bar/mat-snack-bar.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule } from '@angular/material/icon';
import { DialogConfirmationComponent } from './shared/components/dialog-confirmation/dialog-confirmation.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ModuleSiGuard } from './core/guards/module-si.guard';
import { CoreModule } from './core/core.module';

import { environment } from '../environments/environment';
import { DialogEditOneInputComponent } from './shared/components/dialog-edit-one-input/dialog-edit-one-input.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouteReuseStrategy } from '@angular/router';
import { AppRouteReuseStrategy } from './app.route-reuse-strategy';


import localeEsPe from '@angular/common/locales/es-PE'
import { registerLocaleData } from '@angular/common';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
registerLocaleData(localeEsPe, 'es-PE')

const config: SocketIoConfig = { url: environment.WLI_SOCKET_SERVER, options: {} };
//const config: SocketIoConfig = { url: 'http://192.168.1.96:3000', options: {} };
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ShowMessageComponent,
    MatSnackBarComponent,
    DialogConfirmationComponent,
    DialogEditOneInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
        MatSliderModule,
        MainViewModule,
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule,
        CoreModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        SocketIoModule.forRoot(config),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
  ],
  providers: [MatSnackBar,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }, ModuleSiGuard,
    /*
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}*/

    {
      provide:
      LOCALE_ID, useValue:'es-PE'
    },

    
    /*{
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'S/.',
      multi:false
      
    },*/
],
  bootstrap: [AppComponent]
})
export class AppModule { }
