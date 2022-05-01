import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleSiGuard } from 'src/app/core/guards/module-si.guard';
import { PermissionComponent } from './permission.component';

const routes:Routes=[
  
  {
    path: ':roleId',
    component: PermissionComponent,

    /*canLoad:[ModuleSiGuard],
    data:{permission: PMS.SI_PERMISSIONS_SEE} */ 
  },
  {
    path:'**',
    redirectTo:'0'
  }
 
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
