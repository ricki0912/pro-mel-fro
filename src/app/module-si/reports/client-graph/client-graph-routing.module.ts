import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientGraphComponent } from './client-graph.component';

const routes: Routes = [
  {
    path: '',
     component: ClientGraphComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientGraphRoutingModule { }
