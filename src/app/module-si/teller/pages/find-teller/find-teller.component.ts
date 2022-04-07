


import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import {
  AbstractControl, FormBuilder, ValidationErrors, AsyncValidatorFn,
  FormControl, FormGroup, Validators
} from '@angular/forms';
//import {Observable} from "rxjs/Observable";

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { Teller, TELLER_TYPES_STATE, TTellerJoinPerson } from 'src/app/interfaces/teller';
import { TellerService } from 'src/app/services/teller.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';





@Component({
  selector: 'app-find-teller',
  templateUrl: './find-teller.component.html',
  styleUrls: ['./find-teller.component.scss']
})
export class FindTellerComponent implements OnInit, OnDestroy {
  isLoading:boolean=false;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'symbols'];

  tellerSelected?:TTellerJoinPerson;

  dataSource = new MatTableDataSource<TTellerJoinPerson>();


  setTellerSelected(tellerSelected:TTellerJoinPerson){
    this.tellerSelected=tellerSelected
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


  title = "Seleccionar Ventanilla"
  
  constructor(
    public mediaObserver: MediaObserver,
    private tellerService: TellerService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Teller, type: Number },
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private dialogRef: MatDialogRef<FindTellerComponent>,

  ) { }
  ngOnInit(): void {
    this.renderScreen()
    this.readCRUDUserWhitPeson()
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

  onReturn = (user: TTellerJoinPerson): void => this.dialogRef.close(user);
  /*Prepara para guaarda y actualizar */
  ok() {
    const t=this.tellerSelected;
    if(t){
      if(t==TELLER_TYPES_STATE.ACTIVO)
        this.openDialogConfirmation(()=>this.onReturn(t))
      else
        this.onReturn(t)
    }
  }

  openDialogConfirmation(d:()=>void){
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
  }
  
  readCRUDUserWhitPeson(){
    this.isLoading=true;
    this.tellerService.getJoinPerson().subscribe({
      next:data=>{
        this.isLoading=false;
//        this.usersWithPerson=data
        this.dataSource.data=data.data as TTellerJoinPerson[]
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


