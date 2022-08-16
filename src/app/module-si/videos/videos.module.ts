import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';
import { EditVideoComponent } from './pages/edit-video/edit-video.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import { TabVideosComponent } from './pages/tab-videos/tab-videos.component';
import { TabSearchComponent } from './pages/tab-search/tab-search.component';
import { TabTicketDispensingComponent } from './pages/tab-ticket-dispensing/tab-ticket-dispensing.component';
import { PreviewVideoComponent } from './pages/preview-video/preview-video.component';

import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TabMainControlComponent } from './pages/tab-main-control/tab-main-control.component';
import {MatSliderModule} from '@angular/material/slider';
import { YouTubePlayerModule } from "@angular/youtube-player";


@NgModule({
  declarations: [
    VideosComponent,
    EditVideoComponent,
    TabVideosComponent,
    TabSearchComponent,
    TabTicketDispensingComponent,
    PreviewVideoComponent,
    TabMainControlComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatTabsModule, 
    ScrollingModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    YouTubePlayerModule
  ]
})
export class VideosModule { }
