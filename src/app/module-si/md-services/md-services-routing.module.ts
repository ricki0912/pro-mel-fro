import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdServicesComponent } from './md-services.component';

const routes:Routes=[
  {
    path: '',
    component: MdServicesComponent,
    children:[
      {path:'services', component: MdServicesComponent},

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MdServicesRoutingModule { }
