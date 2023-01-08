import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingGraphComponent } from './accounting-graph.component';

const routes: Routes = [
  {
    path: '',
     component: AccountingGraphComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingGraphRoutingModule { }
