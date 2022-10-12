import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { Bussines, TellerJoinUsers } from 'src/app/interfaces/bussines';
import { Teller } from 'src/app/interfaces/teller';
import { BussinesService } from 'src/app/services/bussines.service';
import { TellerService } from 'src/app/services/teller.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { CopyService } from 'src/app/shared/services/copy/copy.service';
import { AssignTellerComponent } from '../client/pages/assign-teller/assign-teller.component';
import { MainViewService } from '../main-view/main-view.service';
import { ClientViewService } from './client-view.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss'],
})
export class ClientViewComponent implements OnInit, OnDestroy, CrudInterface {
  private hqId:number=0
  isLoading = true;
  business: Bussines[]=[];
  contentBusiness = true;
  contentServices = false;

  teller:Teller={tellName:'Sin ventanilla'}


  constructor(
    private location : Location,
    private activate : ActivatedRoute,
    private businessService: BussinesService,
    private showMessage: ShowMessageService,
    private clientViewService: ClientViewService,
    public dialogEditClient: MatDialog,
    private mainViewService:MainViewService, 
    private tellerService:TellerService,
    private copyService:CopyService

  ) { }

  ngOnInit(): void {
    this.activate.params.subscribe((params)=>{
      this.readCRUD(params['bussId']);
    })
    this.listenRoute(o=>{});
    this.getTeller()

  }
  
  ngOnDestroy(): void {

  }

  

  private listenRoute(c:(o:any)=>void){
    this.mainViewService.getParams().subscribe(p=>{
      this.hqId=parseInt(p['hqId'] || 0)
      c(this.hqId)
    })
  }

  showServices(){
    this.contentBusiness = !this.contentBusiness;
    this.contentServices = !this.contentServices;
  }

  createCRUD(object: any): boolean {
    throw new Error('Method not implemented.');
  }

  readCRUD(id : number[]): boolean {
    this.isLoading=true;
    this.businessService.findBusiness(id)?.subscribe({
      next: data=>{
        this.business=data
        this.isLoading=false
        this.onSelectedBussines(this.business[0])
        if(this.business[0].tellId)
        this.findTeller(this.business[0].tellId)
      },
      error: e=>{
        this.showMessage.error({message: e.error.message})
      }
    })
    return true;
  }

  findTeller=(tellId:number)=>{this.tellerService.find(tellId).subscribe({next:d=>this.clientViewService.onTeller(d)})}
  getTeller=()=>{this.clientViewService.getTeller().subscribe({next:d=> {if(d){this.teller=d}} })}

  beforeCopy=(keyName:string, copiedWord?:string)=>this.copyService.copy(keyName, copiedWord)
  

  updateCRUD(object: any, id: string | number | null): boolean {
    throw new Error('Method not implemented.');
  }
  deleteCRUD(ids: string | number | string[] | number[] | null): boolean {
    throw new Error('Method not implemented.');
  }

  private onSelectedBussines(business:Bussines){
    this.clientViewService.onSelectedBussines(business)
  }

  openDialogSetTeller(bussId:any){
    const id = [bussId || -1];
    const dialogRef = this.dialogEditClient.open(AssignTellerComponent, {
      panelClass: 'dialog',
      data: {
        row: null,
        type: TYPES_ACTIONS_DIALOG.ADD,
        hqId: this.hqId
      }
    });
    dialogRef.afterClosed().subscribe((result: TellerJoinUsers) => {
      if (result) {
        this.updateBusinessTeller(id, result.tellId || -1)
      }
    });
  }

  private updateBusinessTeller(bussIds:number[], tellId:number){
    this.businessService.updateBusinessTellId(bussIds, tellId).subscribe({
      next:d=>{
        this.showMessage.success({message:d.msg});
      },
      error:e=>{
        this.showMessage.error({message:e.error.message,  action: ()=>this.updateBusinessTeller(bussIds, tellId)})
      }
    })
  }

}


