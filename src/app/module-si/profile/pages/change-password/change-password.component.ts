

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
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Password } from 'src/app/auth/interfaces/password';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  cols: number = 1;

  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  mediaSub!: Subscription;


  title = "Cambiar contraseña"
  

  changePassForm: FormGroup = this.fb.group({
    passwordOld: ['', Validators.required],
    passwordNew: ['', Validators.required],
    passwordNewRepet: ['',Validators.required] /*{
       Validators:[ Validators.required ],
      asyncValidators: this.validateRepetPassword.bind(this),
      updateOn: 'blur',

      }]*/,
    
    
  })


  constructor(
    public mediaObserver: MediaObserver,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: User, type: Number },
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,

  ) { }
  ngOnInit(): void {
    this.renderScreen()
    //this.selectCategory(this.paramsDialog.row)
    this.setTypeDialog()
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  /*private validateRepetPassword (control: AbstractControl) {
    return new Promise((resolve, reject) => {
      if (control.value == this.changePassForm.controls['passwordNew'].value ) {
        resolve(null)
      } else {
        resolve({ isPasswordDifferent: 'Las contraseñas nuevas no coinciden' })

      }
    });
  }*/
  private renderScreen = (): void => {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })
  }

    private setTypeDialog() {
      this.title=this.title+' | '+this.paramsDialog.row.person.perName
    }





    private onReturn = (category: User): void => this.dialogRef.close(category);
  /*Prepara para guaarda y actualizar */
  
  addUpd() {
    const p:Password=this.changePassForm.value;
    console.log(p)
    this.changePasswordWithAuth(p)
  }


  private changePasswordWithAuth(p:Password){
    this.authService.changePasswordWithAuth(p).subscribe({
      next:d=>{
        this.showMessage.success({message:d.msg})
        this.onReturn(this.paramsDialog.row)
      },
      error:e=>{
        this.showMessage.error({message: e.error.message})
      }
    })
  }
}

interface GridResponsive {
  [key: string]: number
}
