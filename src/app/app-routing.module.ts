import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { AppRouteReuseStrategy } from './app.route-reuse-strategy';
import { ModuleSiGuard } from './core/guards/module-si.guard';
import { PMS } from './core/permission/pms.enum';

const routes: Routes = [
  {
    path: 'tv/:hqId',
    loadChildren: ()=>import('./module-tv/tv.module').then(m=>m.TVModule)
  },
  {
    path: 'auth',
    loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule),
  },
  {
    path:'si',
    loadChildren:()=>import('./module-si/main-view.module').then(m=>m.MainViewModule),
    canLoad:[ModuleSiGuard],
    data:{permission: PMS.SI_SEE}
  },
  {
    path:'ticket-dispensing/:hqId',
    loadChildren:()=>import('./module-ticket-dispensing/ticket-dispensing.module').then(m=>m.TicketDispensingModule)
  },
  {
    path: 'print-server/:hqId',
    loadChildren:()=>import('./module-print-server/module-print-server.module').then(m=>m.ModulePrintServerModule)
  },
  { path: '**',   redirectTo: 'si', pathMatch: 'full' }, 

  /*{
    path:'**',
    redirectTo: 'auth/login',
    pathMatch: 'full'

  },*/
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
   
  ]
})
export class AppRoutingModule { }
