import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TVComponent } from './tv/tv.component';

const routes: Routes = [
  {path: '', component: TVComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TVRoutingModule { }
