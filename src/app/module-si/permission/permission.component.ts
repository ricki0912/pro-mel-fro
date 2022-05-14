import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OCBPermission, Permission, TCBPermission } from 'src/app/interfaces/permission';
import { Role } from 'src/app/interfaces/role';
import { PermissionService } from 'src/app/services/permission.service';
import { RoleService } from 'src/app/services/role.service';
import {Location} from '@angular/common';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';


@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  toppings: FormGroup;
  public loadingRoles=false;
  public loadingPermissions=false;
  public roles:Role[]=[]
  public permissions:TCBPermission[]=[];
  public permissionsByRole:OCBPermission={}
  //public permissions
public titlePermissions:string="Seleccione un rol para agregar o actualizar sus permisos."

  constructor(
      fb: FormBuilder,
      private roleService:RoleService,
      private permissionService:PermissionService,
      private location: Location,
      private activatedRoute: ActivatedRoute, 
      private showMessage: ShowMessageService,
      ) {
    this.toppings = fb.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false,
    });
  }

  ngOnInit(): void {
     this.readRoles();
     this.readPermissions();

    this.listenRoute()
  }

  private listenRoute(){
    this.activatedRoute.params.subscribe((params)=>{
      const roleId=parseInt(params['roleId'] || -1)
      if(roleId>0 && this.roles.length>0){
        this.titlePermissions=this.roles.find(e=>e.id==roleId)?.name || "Seleccione un rol para agregar o actualizar sus permisos.";
        this.readPermissionsByRole(this.titlePermissions)
      }
      
    })
  }

    /*load(indicatorSelect:MatSelectionList){
    console.log(Object.getPrototypeOf(indicatorSelect)); // true
    
    console.log(this.location.path());

    this.service.all(indicatorSelect.selectedOptions.selected[0]?.value).subscribe((r:IndicatorSettings[])=> {
      //this.indicatorSettings=r
      this.isLoading = false;
      this.dataSource.data = r;
    }, error=>this.isLoading=false
    )
  }*/


  private  readRoles(){
    this.loadingRoles=true
    this.roleService.all().subscribe({
      next:d=>{
        this.roles=d.data as Role[]
        this.loadingRoles=false;
      }
      
    });
    

  }

  private   readPermissions(){
    this.loadingPermissions=true
    this.permissionService.all().subscribe({
      next:d=>{
        console.log("Lurico ",d.data)
        this.permissions=d.data as TCBPermission[]
        this.loadingPermissions=false;
      }
      
    });
  }

  public saveChanges(){
   
    const p:number[]=this.permissions.reduce((a:number[], e)=>(e.selected)?[...a, e.id||1-1]:a ,[])
    console.log("array reduce para save",p)  
    this.syncPermissionsByRole( this.titlePermissions, p)
  }

  
  private readPermissionsByRole(roleName:string){
    this.loadingPermissions=true

    this.roleService.getPersmissions(roleName).subscribe({
      next: d=>{
        const t=d.data as TCBPermission[]
        this.permissionsByRole=t.reduce((acc, key)=>({...acc, [key.name || '']:key}),{})
        console.log(this.permissionsByRole)
        this.showFilteredPermissions()        
        this.loadingPermissions=false;

      }, 
      error:e=>{

      }
    })
  }

  private showFilteredPermissions(){
    for(let permission of this.permissions){
      if(permission.name && this.permissionsByRole[permission.name]){
        permission.selected=true;
      }else{
        permission.selected=false;
      }
    }
  }

  private syncPermissionsByRole(roleName:string, permissionsIds:number[]){
    this.roleService.syncPermissions(roleName, permissionsIds).subscribe({
      next:d=>{
        this.showMessage.success({message:d.msg})
      },
      error:e=>{
        this.showMessage.success({message:e.error.message})
      }
    })
  }

}
