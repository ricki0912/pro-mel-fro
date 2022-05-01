import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleSiGuard } from '../core/guards/module-si.guard';
import { PMS } from '../core/permission/pms.enum';
import { MainViewComponent } from './main-view/main-view.component';

const routes: Routes=[
  {
    path:'',
    component: MainViewComponent,
    children: [
      {
        path: '',
        //component: CategoryComponent
        loadChildren: ()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
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
      { path: 'clients/:bussId',
        //component: ClientComponent
        loadChildren: ()=>import('./client-view/client-view.module').then(m=>m.ClientViewModule)
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
        path: 'prueba',
        loadChildren:()=>import('./prueba/prueba.module').then(m=>m.PruebaModule)
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
