import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ClientViewRoutingModule } from './client-view-routing.module';
import { ClientViewComponent } from './client-view.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InfoBusinessComponent } from './pages/info-business/info-business.component';
import { InfoPersonComponent } from './pages/info-person/info-person.component';
import { InfoAfiliationComponent } from './pages/info-afiliation/info-afiliation.component';
import { InfoAditionalComponent } from './pages/info-aditional/info-aditional.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ServicesComponent } from './pages/services/services.component';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { InlineEditComponent } from './pages/inline-edit/inline-edit.component';
import { AddServicesComponent } from './pages/add-services/add-services.component';
import { AddPeriodComponent } from './pages/add-period/add-period.component';
import { AddAmountComponent } from './pages/add-amount/add-amount.component';
import {MatListModule} from '@angular/material/list';
import { ListBussPeriodsComponent } from './pages/list-buss-periods/list-buss-periods.component';
import { GeneralInformationComponent } from './pages/general-information/general-information.component';
import { ProofOfPaymentComponent } from './pages/proof-of-payment/proof-of-payment.component';
import { MatMenuModule} from '@angular/material/menu';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RouteReuseStrategy } from '@angular/router';
import { ClientViewRouteReuseStrategy } from './client-view.route-reuse-strategy';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DetailServicesProvidedComponent } from './pages/detail-services-provided/detail-services-provided.component';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    ClientViewComponent,
    InfoBusinessComponent,
    InfoPersonComponent,
    InfoAfiliationComponent,
    InfoAditionalComponent,
    ServicesComponent,
    InlineEditComponent,
    AddServicesComponent,
    AddPeriodComponent,
    AddAmountComponent,
    ListBussPeriodsComponent,
    GeneralInformationComponent,
    DetailServicesProvidedComponent,
    ProofOfPaymentComponent
  ],
  imports: [
    CommonModule,
    ClientViewRoutingModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
    SatPopoverModule,
    MatListModule,
    MatMenuModule,
    ClipboardModule,
    MatButtonToggleModule,
    NgxMatSelectSearchModule,
    MatToolbarModule
  ],
  providers: [
    DatePipe,
   
  ]
})
export class ClientViewModule { }
