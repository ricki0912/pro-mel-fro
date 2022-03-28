import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TVRoutingModule } from './tv-routing.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { TVComponent } from './tv/tv.component';

import { NotificationComponent } from './tv/pages/notification/notification.component';
import { VideoComponent } from './tv/pages/video/video.component';
import { CalledComponent } from './tv/pages/called/called.component';
import { TimeComponent } from './tv/pages/time/time.component';

import { YouTubePlayerModule } from "@angular/youtube-player";



@NgModule({
  declarations: [TVComponent, NotificationComponent, VideoComponent, CalledComponent, TimeComponent],
  imports: [
    CommonModule,
    TVRoutingModule,
    MatGridListModule,
    /*VIDEO */
    YouTubePlayerModule
  ]
})
export class TVModule { }
