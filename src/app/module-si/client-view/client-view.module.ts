import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClientViewRoutingModule } from './client-view-routing.module';
import { ClientViewComponent } from './client-view.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
//import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SwiperModule } from 'swiper/angular';
import { AddAmountComponent } from './pages/add-amount/add-amount.component';
import { AddPeriodComponent } from './pages/add-period/add-period.component';
import { AddServicesComponent } from './pages/add-services/add-services.component';
import { AnnualSummaryGraphComponent } from './pages/annual-summary/annual-summary-graph/annual-summary-graph.component';
import { AnnualSummaryComponent } from './pages/annual-summary/annual-summary.component';
import { ListPeriodsComponent } from './pages/annual-summary/list-periods/list-periods.component';
import { TableEditComponent } from './pages/annual-summary/table-edit/table-edit.component';
import { DetailServicesProvidedComponent } from './pages/detail-services-provided/detail-services-provided.component';
import { EditCommentClientComponent } from './pages/edit-comment-client/edit-comment-client.component';
import { GeneralInformationComponent } from './pages/general-information/general-information.component';
import { InfoAditionalComponent } from './pages/info-aditional/info-aditional.component';
import { InfoAfiliationComponent } from './pages/info-afiliation/info-afiliation.component';
import { InfoBusinessComponent } from './pages/info-business/info-business.component';
import { InfoPersonComponent } from './pages/info-person/info-person.component';
import { InlineEditComponent } from './pages/inline-edit/inline-edit.component';
import { LastAppointmentComponent } from './pages/last-appointment/last-appointment.component';
import { ListBussPeriodsComponent } from './pages/list-buss-periods/list-buss-periods.component';
import { PayInGroupComponent } from './pages/pay-in-group/pay-in-group.component';
import { ProofOfPaymentComponent } from './pages/proof-of-payment/proof-of-payment.component';
import { ServicesComponent } from './pages/services/services.component';
import { GenerateRegisterComponent } from './pages/annual-summary/generate-register/generate-register.component';
import { TableRegisterComponent } from './pages/annual-summary/table-register/table-register.component';
import { TasksCompletedComponent } from './pages/tasks-completed/tasks-completed.component';
import {ListTasksCompletedComponent} from './pages/list-tasks-completed/list-tasks-completed.component';
import { TaskCardComponent } from './pages/task-card/task-card.component';
import { GroupOfTaskCardComponent } from './pages/group-of-task-card/group-of-task-card.component'

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
    ProofOfPaymentComponent,
    LastAppointmentComponent,
    EditCommentClientComponent,
    PayInGroupComponent,
    AnnualSummaryComponent,
    ListPeriodsComponent,
    TableEditComponent,
    AnnualSummaryGraphComponent,
    GenerateRegisterComponent,
    TableRegisterComponent,
    TasksCompletedComponent,
    ListTasksCompletedComponent,
    TaskCardComponent,
    GroupOfTaskCardComponent
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
    MatToolbarModule,
    MatMomentDateModule,
    SwiperModule,
    MatChipsModule,
    MatTooltipModule,
    NgxChartsModule,
  ],
  providers: [DatePipe],
})
export class ClientViewModule {}
