import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path:'si/:hqId',
    loadChildren:()=>import('./module-si/main-view.module').then(m=>m.MainViewModule),
    /*canLoad:[ModuleSiGuard],
    data:{permission: PMS.SI_SEE}*/
  },
  {
    path:'ticket-dispensing/:hqId',
    loadChildren:()=>import('./module-ticket-dispensing/ticket-dispensing.module').then(m=>m.TicketDispensingModule)
  },
  /*{
    path:'**',
    redirectTo: 'auth/login',
    pathMatch: 'full'

  },*/
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
