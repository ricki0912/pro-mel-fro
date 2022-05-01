
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { Teller } from 'src/app/interfaces/teller';
import { EditComponent } from './pages/edit/edit.component';
import { TellerService } from 'src/app/services/teller.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MainViewService } from '../main-view/main-view.service';

//dialogo
//import { EditComponent } from './edit/edit.component';


@Component({
  selector: 'app-teller',
  templateUrl: './teller.component.html',
  styleUrls: ['./teller.component.scss']
})
export class TellerComponent implements OnInit, AfterViewInit, ActionDialogInterface, CrudInterface {
  isLoading=true;
  tellers: Teller[]=[];
  
  /*Id de sede */
  private hqId:number=0;

  ngAfterViewInit() {
  }

  constructor(
    public dialogEditUser: MatDialog,
    private tellerService: TellerService,
    private loadingService: LoadingService,
    private showMessage: ShowMessageService,
    private mainViewService:MainViewService
    ) {

  }

  ngOnInit(): void {
    this.listenRoute((o)=>this.readCRUD(o))
  }
  
  private listenRoute(c:(o:any)=>void){
    this.mainViewService.getParams().subscribe((params)=>{
      this.hqId = parseInt(params['hqId'] || 0)
      c(this.hqId)
    })
  }
  /*OPEN MODAL  */
  beforeOpenDialogAdd(){
    if(this.hqId==0){
      return;
    }
    this.openDialogAdd()
  }
  openDialogAdd(): boolean {
    const dialogRef = this.dialogEditUser.open(EditComponent, {
      panelClass: 'dialog',
      data: {
        row: null,
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });
    dialogRef.afterClosed().subscribe((result:Teller) => {
      if(result){
        
        this.createCRUD(result)
      }
    });
    return false;
  }

  openDialogUpd(data: Teller): boolean {
    /*const dialogRef = this.dialogEditUser.open(EditComponent, {
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
    });*/
    return false;
  }
  openDialogdAddAndUpd(object: any): boolean {

    return false;
  }

  /*Crud service */
  createCRUD(object: Teller): boolean {
    object.hqId=this.hqId
    this.tellerService.add(object).subscribe({
      next: data=>{
        //this.readCRUD()
        const tellers=data.data as Teller[]
        this.tellers.unshift(...tellers)
        this.showMessage.success({message: data.msg})
      },
      error: error=>{
        this.showMessage.error({message: error.error.message, action:()=>this.createCRUD(object)})
      }
    })

    return true;
  }

  updateCRUD(object: Teller ): boolean {
  /*  this.tellerService.upd(object).subscribe({
      next: data=>{
        this.showMessage.success({message: data.msg})
        this.readCRUD()
      },
      error: error=>{
        this.showMessage.error({message: error.error.message, action:()=>this.updateCRUD(object)})
      }
    })
*/
    return true;
  }

  readCRUD(hqId:number): boolean {
    console.log("HQID", hqId)
    this.isLoading=true;
    this.tellerService.allByHQ(hqId).subscribe({
      next: d=>{
        this.tellers=d
        this.isLoading=false
        //this.showMessage.success({message:"Cargado exitosamente"})
      }, 
      error: e=>{
        this.showMessage.error({message: e.error.message})
      }
    })
    return true
  }
  
  beforeDelete(id:number){
    this.wantDelete(()=>this.deleteCRUD(id))
  }
  wantDelete(d:()=>void){
    this.dialogEditUser
      .open(DialogConfirmationComponent, {
        data: `Esta seguro que desea eliminar.`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          d();
        } else {

        }
      });
  }

  deleteCRUD(id: number): boolean {
    this.tellerService.del(id).subscribe({
      next: data=>{
        this.showMessage.success({message: data.msg});
        this.readCRUD(this.hqId);
      },
      error: error=>{
        this.showMessage.error({message: error.error.message})
      }
    })
    return true;
  }

}


