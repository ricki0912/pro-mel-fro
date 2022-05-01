import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaitingLineComponent } from './waiting-line.component';

const routes: Routes = [
  {
    path: '',
     component: WaitingLineComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaitingLineRoutingModule { }
