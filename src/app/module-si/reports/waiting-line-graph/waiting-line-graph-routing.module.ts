import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaitingLineGraphComponent } from './waiting-line-graph.component';

const routes: Routes = [
  {
    path: '',
     component: WaitingLineGraphComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaitingLineGraphRoutingModule { }
