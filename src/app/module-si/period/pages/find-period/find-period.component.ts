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
import { PeriodService } from 'src/app/services/period.service';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { MainViewService } from 'src/app/module-si/main-view/main-view.service';


@Component({
  selector: 'app-find-period',
  templateUrl: './find-period.component.html',
  styleUrls: ['./find-period.component.scss']
})
export class FindPeriodComponent implements OnInit, OnDestroy {
  isLoading:boolean=false;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  periodSelected?:Period;

  dataSource = new MatTableDataSource<Period>();


  setPeriodSelected(periodSelected:Period){
    this.periodSelected=periodSelected
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cols: number = 1;

  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  mediaSub!: Subscription;


  title = "Seleccionar Periodo"
  
  constructor(
    public mediaObserver: MediaObserver,
    private periodService: PeriodService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Period, type: Number, hqId:number},
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private dialogRef: MatDialogRef<FindPeriodComponent>,
    private mainViewMain:MainViewService
  ) { }
  ngOnInit(): void {
    this.renderScreen()
    this.readCRUDPeriod(PERIOD_STATE.ENABLE)
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

  onReturn = (period: Period): void => this.dialogRef.close(period);
  /*Prepara para guaarda y actualizar */
  ok() {
    const t=this.periodSelected;
    if(t)
      this.onReturn(t);
    /*if(t){
      if(t==PERIOD_STATE.ENABLE)
        this.openDialogConfirmation(()=>this.onReturn(t))
      else
        this.onReturn(t)
    }*/
  }

  /*openDialogConfirmation(d:()=>void){
    this.dialog
      .open(DialogConfirmationComponent, {
        data: `Esta ventanilla esta inactiva, ¿Está seguro que desea tranferir aquí?.`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          d();
        } else {
          
        }
      });
  }*/
  
  readCRUDPeriod(prdsState:number){
    this.isLoading=true;
    
    this.periodService.all(prdsState).subscribe({
      next:data=>{
        this.isLoading=false;
//        this.usersWithPerson=data
        this.dataSource.data=data.data as Period[]
      }, 
      error:error=>{
        this.isLoading=false;
        this.showMessage.error({message:error.error.message})
      }
    });
  }
}

interface GridResponsive {
  [key: string]: number
}


