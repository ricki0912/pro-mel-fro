



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
import { QUOTE_REQUESTS_STATE, QuoteRequest } from 'src/app/interfaces/quote-request';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { QuoteRequestService } from 'src/app/services/quote-request.service';

@Component({
  selector: 'app-comment-quote-request',
  templateUrl: './comment-quote-request.component.html',
  styleUrls: ['./comment-quote-request.component.scss']
})
export class CommentQuoteRequestComponent implements OnInit, OnDestroy {

  cols: number = 2;
  QRS=QUOTE_REQUESTS_STATE

  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  mediaSub!: Subscription;


  title = "Atender solicitud de cotización"
  


  quoteRequestBefore:QuoteRequest|null=null

  quoteRequestForm: FormGroup = this.fb.group({
    quoteAssignedToTellId: ['', Validators.required],
    quoteReqState: ['', Validators.required],
    quoteReqComment: ['',   [Validators.maxLength(500),Validators.required]]   //corregir esta linea
  })


  constructor(
    public mediaObserver: MediaObserver,
    private tellerService: TellerService,
    public dialogFindCategory: MatDialog,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: {quoteRequest: QuoteRequest, tellers: Teller[]}, type: Number },
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private dialogRef: MatDialogRef<CommentQuoteRequestComponent>,
    private tokenStorageService: TokenStorageService,
    private quoteRequestService: QuoteRequestService
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
    console.log(this.paramsDialog.row)

    //omite el hecho de actualizar o añadir, trata de plasmar todo lo que tenga
    this.quoteRequestBefore=this.paramsDialog.row.quoteRequest;

    this.quoteRequestForm.controls['quoteAssignedToTellId'].setValue(this.quoteRequestBefore?.quoteAssignedToTellId)
    if(this.quoteRequestBefore?.quoteAssignedToTellId===undefined || this.quoteRequestBefore?.quoteAssignedToTellId===null){
      this.quoteRequestForm.controls['quoteAssignedToTellId'].setValue(this.tokenStorageService.getTeller()?.tellId)
    }
    
    this.quoteRequestForm.controls['quoteReqState'].setValue(this.quoteRequestBefore?.quoteReqState)
    if(this.quoteRequestBefore?.quoteReqState==QUOTE_REQUESTS_STATE.PENDING){
      this.quoteRequestForm.controls['quoteReqState'].setValue(QUOTE_REQUESTS_STATE.ASSIGNED)
    }

    this.quoteRequestForm.controls['quoteReqComment'].setValue(this.quoteRequestBefore?.quoteReqComment)
  }





  onReturn = (a: QuoteRequest): void => this.dialogRef.close(a);
  /*Prepara para guaarda y actualizar */
  addUpd() {
  
    this.update()
  }
  add() {
    
    const o: QuoteRequest = {...this.quoteRequestBefore, ...this.quoteRequestForm.value}
    console.log("Registroa retornar", o)
    this.onReturn(o); 
  }
  
  /** */

  update() {
    const o: QuoteRequest = {...this.quoteRequestBefore, ...this.quoteRequestForm.value};
    this.quoteRequestService.update(this.quoteRequestBefore?.quoteReqId as number, o).subscribe({
      next: d => {
        this.showMessage.success({ message: "Se actualizó correctamente" })
        this.onReturn(d.data as QuoteRequest)
        //this.dialogRef.close(d.data as QuoteRequest)
      },
      error: e => {
        this.showMessage.error({ message: "Ocurrió un error al actualizar" })
      }
    })
  }

}

interface GridResponsive {
  [key: string]: number
}
