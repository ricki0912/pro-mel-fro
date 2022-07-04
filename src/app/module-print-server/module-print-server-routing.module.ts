import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintServerComponent } from './print-server/print-server.component';

const routes: Routes = [

  {
    path:'',
    component: PrintServerComponent,
    children:[
      {path:'asdf', component: PrintServerComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulePrintServerRoutingModule { }
