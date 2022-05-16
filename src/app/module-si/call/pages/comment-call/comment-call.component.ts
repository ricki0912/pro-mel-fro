



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

  cols: number = 2;

  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  mediaSub!: Subscription;


  title = "Añadir comentario"
  


  appointmentTempBefore:AppointmentTemp={}

  appointmentTempForm: FormGroup = this.fb.group({
    apptmNumberDocClient:[''],
    apptmNameClient:[''],
    apptmTel: ['', Validators.pattern("[9]{1}[0-9]{8}")],
    apptmEmail: ['', Validators.email],
    apptmComment: ['', Validators.maxLength]  
  })


  constructor(
    public mediaObserver: MediaObserver,
    private tellerService: TellerService,
    public dialogFindCategory: MatDialog,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: AppointmentTemp, type: Number },
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private dialogRef: MatDialogRef<CommentCallComponent>,

  ) { }
  ngOnInit(): void {
    this.renderScreen()
    //this.selectCategory(this.paramsDialog.row)
    //this.setTypeDialog()
    this.setDataOnForm()
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

  setDataOnForm() {

    //omite el hecho de actualizar o añadir, trata de plasmar todo lo que tenga
    this.appointmentTempBefore=this.paramsDialog.row

    this.appointmentTempForm.controls['apptmNumberDocClient'].setValue(this.appointmentTempBefore.apptmNumberDocClient)
    this.appointmentTempForm.controls['apptmNameClient'].setValue(this.appointmentTempBefore.apptmNameClient)
    this.appointmentTempForm.controls['apptmTel'].setValue(this.appointmentTempBefore.apptmTel)
    this.appointmentTempForm.controls['apptmEmail'].setValue(this.appointmentTempBefore.apptmEmail)
    this.appointmentTempForm.controls['apptmComment'].setValue(this.appointmentTempBefore.apptmComment)
  }





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
