import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';

const routes: Routes=[
  {
    path:'',
    component: MainViewComponent,
    children: [
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
        path: 'users',
        //component: ClientComponent
        loadChildren: ()=>import('./user/user.module').then(m=>m.UserModule)
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
        path: 'prueba',
        loadChildren:()=>import('./prueba/prueba.module').then(m=>m.PruebaModule)
      }
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
