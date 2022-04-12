import { NgModule } from '@angular/core';
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

//const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
const config: SocketIoConfig = { url: 'http://192.168.1.96:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ShowMessageComponent,
    MatSnackBarComponent,
    DialogConfirmationComponent,
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
        
        SocketIoModule.forRoot(config)
  ],
  providers: [MatSnackBar,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
