
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

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  cols: number = 1;

  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  mediaSub!: Subscription;


  title = "Añadir una vantanilla"
  tellerBeforeUpd: Teller = {
    tellName: '',
  };

  tellerForm: FormGroup = this.fb.group({
    tellName: ['', Validators.required],
    tellCode: ['', {
      validators: [Validators.required],
      asyncValidators: this.validateCode.bind(this),
      updateOn: 'blur',
    }],
    
  })


  constructor(
    public mediaObserver: MediaObserver,
    private tellerService: TellerService,
    public dialogFindCategory: MatDialog,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Teller, type: Number },
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private dialogRef: MatDialogRef<EditComponent>,

  ) { }
  ngOnInit(): void {
    this.renderScreen()
    //this.selectCategory(this.paramsDialog.row)
    this.setTypeDialog()
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

  setTypeDialog() {
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      this.tellerBeforeUpd=this.paramsDialog.row;
      this.title=this.tellerBeforeUpd.tellName

      /**AHora mostramos en form */
      this.tellerForm.controls['tellCode'].setValue(this.tellerBeforeUpd.tellCode)
      this.tellerForm.controls['tellName'].setValue(this.tellerBeforeUpd.tellName)
    }

    if (TYPES_ACTIONS_DIALOG.ADD == this.paramsDialog.type) {
    }
  }



  validateCode(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.tellerService.searchByCode(control.value).
      pipe(
        map((teller: Teller) => {
          if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
            if (!teller) {
              return null;
            }
            if (this.tellerBeforeUpd?.tellCode != teller.tellCode) {
              return { existTellCode: 'Este código ya esta en uso.' };
            }
            /**si el usuario devuelto es igual al actual retorna null */
            return null
          }
          return (!teller) ? null : { existTellCode: 'Este código ya esta en uso.' }
        })
      )
  }


  onReturn = (category: Teller): void => this.dialogRef.close(category);
  /*Prepara para guaarda y actualizar */
  addUpd() {
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      this.upd();
    } else {
      this.add();
    }

  }
  add() {
    const tellerObject: Teller = this.tellerForm.value; 
    this.onReturn(tellerObject);
  }
  upd() {
    const tellerObject: Teller = this.tellerForm.value;
    tellerObject.tellId = this.tellerBeforeUpd.tellId;
    this.onReturn(tellerObject);
  }
  /** */

}

interface GridResponsive {
  [key: string]: number
}

/**
 *   personForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.personForm = this._formBuilder.group({
      firstName:  [ '', Validators.required ],
      lastName: [ '', Validators.required ],
    }, {
      asyncValidator: this.validateBusiness.bind(this)
    });
  }

  validateBusiness(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          if (control.value.firstName !== control.value.lastName) {
            resolve(null);
          }
          else {
            resolve({sameValue: 'ERROR...'});
          }
        },
        1000);
    });
  }
 *
  https://github.com/thisiszoaib/angular-async-validation/blob/master/src/app/services/user.service.ts
 */