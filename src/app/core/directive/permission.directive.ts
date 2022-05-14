import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective {

  private permissions:string=''
  private currentUser:any;
  constructor(
    private templateRef:TemplateRef<any>,
    private viewContainer:ViewContainerRef,
    private tokenService:TokenStorageService
  ) { }

  ngOnInit(): void {
    this.currentUser=this.tokenService.getToken()
    
  }

  @Input()
  set appPermission(val: string){
    this.permissions=val;
    const l=this.tokenService.hasPermission(val)
    //this.viewContainer.createEmbeddedView(this.templateRef);

    if (l)
      this.viewContainer.createEmbeddedView(this.templateRef);
    else
      this.viewContainer.clear();
  
  }
}