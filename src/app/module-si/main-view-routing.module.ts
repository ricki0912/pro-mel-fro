import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleSiGuard } from '../core/guards/module-si.guard';
import { PMS } from '../core/permission/pms.enum';
import { MainViewComponent } from './main-view/main-view.component';
import { TokenStorageService } from '../auth/services/token-storage.service';
const routes: Routes=[
  {
    path:'',
    pathMatch:'full',
    redirectTo:String((new TokenStorageService).getHqId())
  },
  {
    path:':hqId',
    component: MainViewComponent,
    children: [

      {
        path: '',
        //component: CategoryComponent
        loadChildren: ()=>import('./call/call.module').then(m=>m.CallModule)

        //loadChildren: ()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
      },
      {
        path: 'categories',
        //component: CategoryComponent
        loadChildren: ()=>import('./category/category.module').then(m=>m.CategoryModule)
      },
      {
        path: 'tellers',
        //component: TellerComponent
        loadChildren:()=>import('./teller/teller.module').then(m=>m.TellerModule)
      },
      {
        path: 'clients',
        //component: ClientComponent
        loadChildren: ()=>import('./client/client.module').then(m=>m.ClientModule)
      },
      {
        path: 'reports/waiting-line',
        //component: ClientComponent
        loadChildren: ()=>import('./reports/waiting-line/waiting-line.module').then(m=>m.WaitingLineModule)
      },
      {
        path: 'reports/waiting-line/:apptmId',
        //component: ClientComponent
        loadChildren: ()=>import('./detail-appointment/detail-appointment.module').then(m=>m.DetailAppointmentModule)
      },

      {
        path: 'reports/waiting-line-graph',
        //component: ClientComponent
        loadChildren: ()=>import('./reports/waiting-line-graph/waiting-line-graph.module').then(m=>m.WaitingLineGraphModule)
      },
      {
        path: 'reports/accounting-graph', 
        loadChildren: ()=>import('./reports/accounting-graph/accounting-graph.module').then(m=>m.AccountingGraphModule)
      },

      {
        path: 'reports/client-graph', 
        loadChildren:()=>import('./reports/client-graph/client-graph.module').then(m=>m.ClientGraphModule)
        //loadChildren: ()=>import('./reports/accounting-graph/accounting-graph.module').then(m=>m.AccountingGraphModule)
      },
      
      {
        path: 'reports/today',
        //component: ClientComponent
        loadChildren: ()=>import('./reports/today/today.module').then(m=>m.TodayModule)
      },
      { path: 'clients/:bussId',
        //component: ClientComponent
        loadChildren: ()=>import('./client-view/client-view.module').then(m=>m.ClientViewModule)
      },

      {
        path: 'statement-pendings-and-observeds', 
        loadChildren:()=>import('./statement-pendings-and-observeds/statement-pendings-and-observeds.module').then(m=>m.StatementPendingsAndObservedsModule)
      },
      
      {
        path: 'statements', 
        loadChildren:()=>import('./statement/statement.module').then(m=>m.StatementModule)
      },
      { 
        path: 'users',
        //component: ClientComponent
        loadChildren: ()=>import('./user/user.module').then(m=>m.UserModule)
      },
      {
        path: 'permissions',
        //component: ClientComponent
        loadChildren: ()=>import('./permission/permission.module').then(m=>m.PermissionModule),
        /*canLoad:[ModuleSiGuard],
        data:{permission: PMS.SI_PERMISSIONS_SEE}*/
      },

      {
        path: 'calls',
        loadChildren: ()=>import('./call/call.module').then(m=>m.CallModule)
      },

      {
        path: 'tickets',
        loadChildren:()=>import('./ticket/ticket.module').then(m=>m.TicketModule)
      },

      {
        path: 'videos',
        loadChildren:()=>import('./videos/videos.module').then(m=>m.VideosModule)
      },
      {
        path: 'cards',
        loadChildren:()=>import('./cards/cards.module').then(m=>m.CardsModule)
      },
      {
        path: 'headquarters',
        loadChildren:()=>import('./headquarters/headquarters.module').then(m=>m.HeadquartersModule)
      },
      {
        path: 'profile',
        loadChildren:()=>import('./profile/profile.module').then(m=>m.ProfileModule)
      },
      {
        path: 'periods',
        loadChildren:()=>import('./period/period.module').then(m=>m.PeriodModule)
      },
      {
        path: 'payment-methods',
        loadChildren:()=>import('./payment-method/payment-method.module').then(m=>m.PaymentMethodModule)
      },
      {
        path: 'services',
        loadChildren:()=>import('./md-services/md-services.module').then(m=>m.MdServicesModule)
      },
      {
        path: 'prueba',
        loadChildren:()=>import('./prueba/prueba.module').then(m=>m.PruebaModule)
      },
      {
        path: 'accounting',
        loadChildren:()=>import('./accounting/accounting.module').then(m=>m.AccountingModule),
        canLoad:[ModuleSiGuard],
        data:{permission: PMS.SI_ACCOUNTING_SEE}
      },

      
      { path: 'accounting/:payToken',
        //component: ClientComponent
        loadChildren: ()=>import('./detail-payment/detail-payment.module').then(m=>m.DetailPaymentModule)
      },
      { path: 'debts-and-paids',
        //component: ClientComponent
        loadChildren: ()=>import('./debts-and-paids/debts-and-paids.module').then(m=>m.DebtsAndPaidsModule),
        canLoad:[ModuleSiGuard],
        data:{permission: PMS.SI_DEBTS_AND_PAIDS_SEE}
      },
      { path: 'last-payment-by-client',
      //component: ClientComponent
      loadChildren: ()=>import('./last-payment-by-client/last-payment-by-client.module').then(m=>m.LastPaymentByClientModule),
      canLoad:[ModuleSiGuard],
        data:{permission: PMS.SI_LAST_PAYMENT_BY_CLIENT_SEE}
      },
      { path: 'old-debt-by-client',
      //component: ClientComponent
      loadChildren: ()=>import('./old-debt-by-client/old-debt-by-client.module').then(m=>m.OldDebtByClientModule),
      canLoad:[ModuleSiGuard],
      data:{permission: PMS.SI_OLD_DEBT_BY_CLIENT_SEE}
      },
      
      

      /*{
        path: 'prueba',
        component: PruebaComponent
      }*/
    ]
  },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class MainViewRoutingModule { }
