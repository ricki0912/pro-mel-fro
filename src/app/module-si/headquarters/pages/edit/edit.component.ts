

import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import {
  AbstractControl, FormBuilder, ValidationErrors, AsyncValidatorFn,
  FormControl, FormGroup, Validators
} from '@angular/forms';
//import {Observable} from "rxjs/Observable";

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { TellerService } from 'src/app/services/teller.service';
import { Headquarter } from 'src/app/interfaces/headquarter';
import { HeadquarterService } from 'src/app/services/headquarter.service';

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


  title = "Añadir Sede"
  
  headquarterBeforeUpd: Headquarter = {
    hqName: '',
  };

  headquarterForm: FormGroup = this.fb.group({
    hqRUC: ['', Validators.required],
    
    hqName: ['', {
      validators: [Validators.required],
      asyncValidators: this.validateCode.bind(this),
      updateOn: 'blur',
    }],
    hqAddress:['', Validators.required]
    
  })


  constructor(
    public mediaObserver: MediaObserver,
    private headquarterService: HeadquarterService,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Headquarter, type: Number },
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
      this.headquarterBeforeUpd=this.paramsDialog.row;
      this.title=this.headquarterBeforeUpd.hqName

      /**AHora mostramos en form */
      this.headquarterForm.controls['hqName'].setValue(this.headquarterBeforeUpd.hqName)
      this.headquarterForm.controls['hqRUC'].setValue(this.headquarterBeforeUpd.hqRUC)
      this.headquarterForm.controls['hqAddress'].setValue(this.headquarterBeforeUpd.hqAddress)
    }

    if (TYPES_ACTIONS_DIALOG.ADD == this.paramsDialog.type) {
    }
  }



  validateCode(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.headquarterService.searchByName(control.value).
      pipe(
        map((hq: Headquarter) => {
          if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
            if (!hq) {
              return null;
            }
            if (this.headquarterBeforeUpd?.hqName != hq.hqName) {
              return { existName: 'Este nombre ya esta en uso.' };
            }
            /**si el usuario devuelto es igual al actual retorna null */
            return null
          }
          return (!hq) ? null : { existName: 'Este nombre ya esta en uso.' }
        })
      )
  }


  onReturn = (category: Headquarter): void => this.dialogRef.close(category);
  /*Prepara para guaarda y actualizar */
  addUpd() {
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      this.upd();
    } else {
      this.add();
    }
  }
  add() {
    const hq: Headquarter = this.headquarterForm.value; 
    this.onReturn(hq);
  }
  upd() {
    const hq: Headquarter = this.headquarterForm.value;
    hq.hqId = this.headquarterBeforeUpd.hqId;
    this.onReturn(hq);
  }
  /** */

}

interface GridResponsive {
  [key: string]: number
}
