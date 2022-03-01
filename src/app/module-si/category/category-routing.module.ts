import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';

const routes:Routes=[
  {
    path: '',
    component: CategoryComponent,
    children:[
      {path:'category', component: CategoryComponent},

    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)

  ]
})
export class CategoryRoutingModule { }
