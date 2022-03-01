import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaComponent } from './prueba.component';
const routes:Routes=[
  {
    path: '',
    component: PruebaComponent
    
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class PruebaRoutingModule { }
