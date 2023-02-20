import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

//import { MatNativeDateModule } from '@angular/material/core';

import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { EditClientComponent } from './pages/edit-client/edit-client.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { AssignTellerComponent } from './pages/assign-teller/assign-teller.component';
import { ChangeStateComponent } from './pages/change-state/change-state.component';
import { FileNumberComponent } from './pages/file-number/file-number.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CoreModule } from 'src/app/core/core.module';
import { DownloadMyFormatDJComponent } from './pages/download-my-format-dj/download-my-format-dj.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    ClientComponent,
    EditClientComponent,
    AssignTellerComponent,
    ChangeStateComponent,
    FileNumberComponent,
    DownloadMyFormatDJComponent,
    
  ],
  imports: [
    ClientRoutingModule,


    MatGridListModule,
    MatDividerModule,

    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,

    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,

    MatDialogModule,
    MatToolbarModule,
    MatIconModule,

    MatInputModule,
    FlexLayoutModule,

    MatExpansionModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule, ReactiveFormsModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatMenuModule,
    MatChipsModule,

    MatTabsModule,

    MatTooltipModule,
    CoreModule
  ],
  exports: [
    ClientComponent,

  ]
})
export class ClientModule {

}
