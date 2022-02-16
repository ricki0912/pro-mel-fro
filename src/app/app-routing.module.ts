import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { ClientComponent } from './components/client/client.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { TellerComponent } from './components/teller/teller.component';

const routes: Routes = [

  {
    path:'',
    component: MainViewComponent,
    children: [
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'teller', 
        component: TellerComponent
      },

      {
        path: 'client',
        component: ClientComponent
      }


  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
