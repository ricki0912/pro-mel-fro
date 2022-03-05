import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import {User} from 'src/app/interfaces/user'
import { UserService } from 'src/app/services/user.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  /*Para renderizar filas */
  cols: number = 1;
  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }
  mediaSub!: Subscription;
  /**Para renderizar filas */

  /*Formulario para añadir usuario con persona */
  userForm: FormGroup = this.fb.group({
    name: ['', {
      validators: [Validators.required],
      asyncValidators: this.validateEmail.bind(this),
      updateOn: 'blur',
    }],
    email: ['', {
      validators: [Validators.required, Validators.email],
      asyncValidators: this.validateEmail.bind(this),
      updateOn: 'blur',
    }],
    password: [],
    person: this.fb.group({

      perKindDoc: [''],
      perNumberDoc: [''],
      perName: [''],
      perTel:['']

    })
  })


  constructor(
    public mediaObserver: MediaObserver,
    private fb: FormBuilder,
    private userSevice:UserService, 
    private showMessage: ShowMessageService
  ) {
    //this.grid.cols=1
  }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }


  addUserWithPerson(): boolean {
    const user: User=this.userForm.value;
    this.userSevice.addUserWithPerson(user).subscribe({
      next:data=>{
        console.log(data);
      }, 
      error: error=>{
        console.log(error);
        this.showMessage.error({message: error.error.message})

      }
    });
    return true
  }



  validateEmail(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {


    return this.userSevice.existEmail(control.value)
      .pipe(
        map((user:User)=>{
          console.log("******EXISTE EMAIL********", user)
          return !user?null:{existEmail: 'El correo electronico esta en uso.'}
        })
      )
    /*return new Promise((resolve, reject) => {
      setTimeout(() => {
        // console.log(control)
        if (control.value !== 'HOLA') {
          resolve(null);
        }
        else {
          resolve({ existValue: 'ERROR...' });
        }
      },
        1000);
    });*/
  }

}

interface GridResponsive {
  [key: string]: number
}


/*export const emailMatcher = (control: AbstractpControl): {[key: string]: boolean} => {
  const email = control.get('email');
  const confirm = control.get('confirm');
  if (!email || !confirm) return null;
  if (email.value === confirm.value) {
    return null;
  }
};*/