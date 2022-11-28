import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OldDebtByClientComponent } from './old-debt-by-client.component';

const routes: Routes = [
  {
    path:'',
    component:OldDebtByClientComponent
  },
  {

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OldDebtByClientRoutingModule { }
