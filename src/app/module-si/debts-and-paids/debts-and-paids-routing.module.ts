import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebtsAndPaidsComponent } from './debts-and-paids.component';

const routes: Routes = [
  {
    path:'',
    component: DebtsAndPaidsComponent
  },
  {

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebtsAndPaidsRoutingModule { }
