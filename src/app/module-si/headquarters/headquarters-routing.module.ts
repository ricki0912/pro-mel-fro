import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadquartersComponent } from './headquarters.component';

const routes:Routes=[
  {
    path: '',
     component: HeadquartersComponent,
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeadquartersRoutingModule { }
