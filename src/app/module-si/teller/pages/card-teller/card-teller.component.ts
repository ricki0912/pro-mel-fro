import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { Category, CATEGORY_LINK_BUS, FlatTreeControlCategory } from 'src/app/interfaces/category';
import { Teller, TELLER_TYPES_STATE } from 'src/app/interfaces/teller';
import { User } from 'src/app/interfaces/user';
import { FindCategoryComponent } from 'src/app/module-si/category/pages/find-category/find-category.component';
import { MainViewService } from 'src/app/module-si/main-view/main-view.service';
import { FindUserComponent } from 'src/app/module-si/user/pages/find-user/find-user.component';
import { TellerService } from 'src/app/services/teller.service';
import { UserService } from 'src/app/services/user.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { EditComponent } from '../edit/edit.component';
@Component({
  selector: 'app-card-teller',
  templateUrl: './card-teller.component.html',
  styleUrls: ['./card-teller.component.scss']
})

export class CardTellerComponent implements OnInit,ActionDialogInterface, CrudInterface  {

  //hqId:number=0

  @Input() teller: Teller = { tellName: '' };
  user?:User
  categories:Category[]=[];

  TTS=TELLER_TYPES_STATE
  CLB=CATEGORY_LINK_BUS
  /*Tabla */

  /*Displayed */
  isDisplay:boolean=false
  constructor(
    public dialog: MatDialog,
    public  tellerService:TellerService,
    private showMessage: ShowMessageService,
    private userSevice:UserService,
    private mainViewService:MainViewService

  ) { }

  ngOnInit(): void {
   if(!this.user && this.teller.userId)
      this.findUser(this.teller.userId)
    if(this.teller.tellId)
      this.getCategories(this.teller.tellId )

      /*this.listenRoute((o)=>{})*/
  }

  /*private listenRoute(c:(o:any)=>void){
    this.mainViewService.getParams().subscribe(params=>{
      this.hqId=parseInt(params['hqId'] || 0)
      c(this.hqId)
    })
  }*/
  /*Dialogs */
  openDialogSetUser(){
    const dialogRef = this.dialog.open(FindUserComponent, {
      panelClass: 'dialog',
      data: {
        row: null,
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });
    dialogRef.afterClosed().subscribe((result:User) => {
      if(result){
        this.user=result
        this.updUser(this.teller.tellId || -1 ,result.id || -1)
      }
    });
  }

  openDialogSetCategory(){
    const dialogRef = this.dialog.open(FindCategoryComponent, {
      panelClass: 'dialog',
      data: {
        row: null,
        type: null,
        hqId:this.teller.hqId
      }
    });
    dialogRef.afterClosed().subscribe((result:FlatTreeControlCategory) => {
      if(result){
        this.attachCategory(this.teller.tellId || -1, result.catId as number)
      }
    });
  }


  openDialogAdd(): boolean {
    const dialogRef = this.dialog.open(FindUserComponent, {
      panelClass: 'dialog',
      data: {
        row: null,
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });
    dialogRef.afterClosed().subscribe((result:Teller) => {
      if(result){
        //this.createCRUD(result)
      }
    });
    return false;
  }


openDialogUpd(data: Teller): boolean {
  const dialogRef = this.dialog.open(EditComponent, {
    panelClass: 'dialog',
    data: {
      row: data,
      type: TYPES_ACTIONS_DIALOG.UPD
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.updateCRUD(result);
    }
  });
  return false;
  return false;
}
openDialogdAddAndUpd(object: any): boolean {
  return false;
}


  /*servicios */
  createCRUD(object: any): boolean {
    return false;
  }
  deleteCRUD(ids: string | number | string[] | number[] | null): boolean {
    return false;
  }

  readCRUD(): boolean {
    return false;
  }
  updateCRUD(object: Teller ): boolean {
    this.tellerService.upd(object).subscribe({
      next: data=>{
        const teller=data.data as Teller[]
        this.teller=teller[0];
        this.showMessage.success({message: data.msg})
      },
      error: error=>{
        this.showMessage.error({message: error.error.message, action:()=>this.updateCRUD(object)})
      }
    })

    return true;
  }

  private updUser(id:number, userId:number){
    this.tellerService.updUser(id,userId).subscribe({
      next:data=>{
        this.showMessage.success({message: data.msg})
      },
      error:error=>{
        this.showMessage.error({message: error.error.message})
      }
    })
  }
  removeUser(id:number){
    this.tellerService.removeUser(id).subscribe({
      next:data=>{
        this.showMessage.success({message: data.msg})
        //set
        this.user=undefined
        this.teller.userId=undefined
      },
      error:error=>{
        this.showMessage.error({message: error.error.message})
      }
    })
  }

  /*servicios otras tablas */
  findUser(id:number){
    console.log(id)
      this.userSevice.find(id).subscribe({
        next: d=>{
          console.log(d)
          this.user=d.data as User
        },
        error: e=>{

        }
      })
  }

  getCategories(id:number){
    this.tellerService.getCategories(id).subscribe({
      next: d=>{
        console.log("**GET-CATEGORIES**",d)
        this.categories=d.data as Category[]
      },
      error:e=>{

      }
    });
  }

  attachCategory(id:number, catId:number){
    this.tellerService.attachCategory(id, catId).subscribe({
      next:d=>{
        this.showMessage.success({message: d.msg})
        this.categories=d.data as Category[];
      },
      error:e=>{
        this.showMessage.error({message:e.error.message})
      }
    });
  }

  detachCategory(id:number, catId:number){
    this.tellerService.detachCategory(id, catId).subscribe({
      next:d=>{
        this.showMessage.success({message:d.msg})
        this.categories=d.data as Category[]
      },
      error:e=>{
        this.showMessage.error({message:e.error.message})
      }
    });
  }

  beforeUpdState(){
    if(this.teller.tellState && this.teller.tellState==TELLER_TYPES_STATE.ACTIVO){
      const tellState=TELLER_TYPES_STATE.EN_ESPERA; /*En espera*/
      this.updState(
        this.teller.tellId || -1,
         tellState,
         ()=>{this.showMessage.success({message:"En espera. "});this.teller.tellState=tellState}
        );
    }
    if(this.teller.tellState && this.teller.tellState==TELLER_TYPES_STATE.EN_ESPERA){
      const tellState=TELLER_TYPES_STATE.ACTIVO;/*Activo*/
      this.updState(
        this.teller.tellId || -1,
        tellState,
        ()=>{this.showMessage.success({message:"En arranque."});this.teller.tellState=tellState}
      );
    }
  }

  updState(id:number, tellState:number, f:()=>void){
    this.tellerService.updState(id, tellState).subscribe({
      next: d=>{
        f();
      },
      error:e=>{
        this.showMessage.error({message:e.error.message})
      }
    })


  }
  /*/*funcioenes de logica */
  getStateName(tellState:number):string{
    if(tellState==TELLER_TYPES_STATE.ACTIVO){
      return TELLER_TYPES_STATE.ACTIVO_NAME
    }
    if(tellState==TELLER_TYPES_STATE.EN_ESPERA){
      return TELLER_TYPES_STATE.EN_ESPERA_NAME
    }
    return ''
  }
}
