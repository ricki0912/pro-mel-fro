

import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import {
  AbstractControl, FormBuilder, ValidationErrors, AsyncValidatorFn,
  FormControl, FormGroup, Validators
} from '@angular/forms';
//import {Observable} from "rxjs/Observable";

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
//import { Teller, TELLER_TYPES_STATE, TTellerJoinPerson } from 'src/app/interfaces/teller';
import{Period, PERIOD_STATE} from 'src/app/interfaces/period'
import { MatTableDataSource } from '@angular/material/table';
import { MainViewService } from 'src/app/module-si/main-view/main-view.service';
import { Bussines } from 'src/app/interfaces/bussines';
import { BussinesService } from 'src/app/services/bussines.service';

import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-find-business2',
  templateUrl: './find-business2.component.html',
  styleUrls: ['./find-business2.component.scss']
})
export class FindBusiness2Component implements OnInit, OnDestroy {
  isLoading:boolean=false;

  businessSelected?:Bussines;
  business:Bussines[]=[]
  businesFiltered:Bussines[]=[]
  wordFiltered:string=''



  setBusinessSelected(businessSelected:Bussines){
    this.businessSelected=businessSelected
  }


  filter(value:string){
    this.wordFiltered=value

    let regex= new RegExp('.*'+value+'.*')
    this.businesFiltered=this.business.filter(e=>regex.test((e.bussName || '').trim().toLowerCase()))
    console.log(this.businesFiltered, this.business)
  }

  cols: number = 2;

  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  mediaSub!: Subscription;


  title = "Encuentra tú RUC"
  
  constructor(
    public mediaObserver: MediaObserver,
    private businessService: BussinesService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Period, type: Number, hqId:number},
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private dialogRef: MatDialogRef<FindBusiness2Component>,
    private mainViewMain:MainViewService
  ) { }
  ngOnInit(): void {
    this.renderScreen()
    this.readCRUDBusiness()
    //this.selectCategory(this.paramsDialog.row)
  }
  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  renderScreen = (): void => {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })
  }

  onReturn = (business: Bussines): void => this.dialogRef.close(business);
  /*Prepara para guaarda y actualizar */
  ok() {
    const t=this.businessSelected;
    if(t)
      this.onReturn(t);
  }


  
  private readCRUDBusiness(){
    this.isLoading=true;
    
    this.businessService.allSummarized()?.subscribe({
      next:data=>{
        this.isLoading=false;
        this.business=data
        this.businesFiltered=data
      }, 
      error:error=>{
        this.isLoading=false;
        this.showMessage.error({message:error.error.message})
      }
    });
  }

  onEdit(event:any, item:Bussines){

  }
}

interface GridResponsive {
  [key: string]: number
}


