import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tv',
    loadChildren: ()=>import('./module-tv/tv.module').then(m=>m.TVModule)
  },
  {
    path: 'auth',
    loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule),
  },
  {
    path:'si',
    loadChildren:()=>import('./module-si/main-view.module').then(m=>m.MainViewModule)
  },
  {
    path:'ticket-dispensing',
    loadChildren:()=>import('./module-ticket-dispensing/ticket-dispensing.module').then(m=>m.TicketDispensingModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
