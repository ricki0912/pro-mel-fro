



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
import { Teller } from 'src/app/interfaces/teller';
import { TellerService } from 'src/app/services/teller.service';
import { AppointmentTemp } from 'src/app/interfaces/appointment-temp';

@Component({
  selector: 'app-comment-call',
  templateUrl: './comment-call.component.html',
  styleUrls: ['./comment-call.component.scss']
})
export class CommentCallComponent implements OnInit, OnDestroy {

  cols: number = 1;

  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  mediaSub!: Subscription;


  title = "Añadir comentario"
  


  appointmentTemp:AppointmentTemp={}
  appointmentTempForm: FormGroup = this.fb.group({
    apptmTel: ['', Validators.pattern("[9]{1}[0-9]{8}")],
    apptmEmail: ['', Validators.email],
    apptmComment: ['', Validators.maxLength]  
  })


  constructor(
    public mediaObserver: MediaObserver,
    private tellerService: TellerService,
    public dialogFindCategory: MatDialog,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Teller, type: Number },
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private dialogRef: MatDialogRef<CommentCallComponent>,

  ) { }
  ngOnInit(): void {
    this.renderScreen()
    //this.selectCategory(this.paramsDialog.row)
    //this.setTypeDialog()
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

  /*setTypeDialog() {
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      this.tellerBeforeUpd=this.paramsDialog.row;
      this.title=this.tellerBeforeUpd.tellName

   
      this.tellerForm.controls['tellCode'].setValue(this.tellerBeforeUpd.tellCode)
      this.tellerForm.controls['tellName'].setValue(this.tellerBeforeUpd.tellName)
    }

    if (TYPES_ACTIONS_DIALOG.ADD == this.paramsDialog.type) {
    }
  }*/





  onReturn = (a: AppointmentTemp): void => this.dialogRef.close(a);
  /*Prepara para guaarda y actualizar */
  addUpd() {
  
    this.add();
  }
  add() {
    const o: AppointmentTemp = this.appointmentTempForm.value; 
    console.log(o)
    this.onReturn(o);
  }
  
  /** */

}

interface GridResponsive {
  [key: string]: number
}
