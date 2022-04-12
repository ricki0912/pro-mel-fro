import { Component, Inject, OnDestroy, OnInit, VERSION, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, Subscription } from 'rxjs';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { User } from 'src/app/interfaces/user'
import { UserService } from 'src/app/services/user.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  TAD=TYPES_ACTIONS_DIALOG
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
    name: [''],
    email: ['', {
      validators: [Validators.required, Validators.email],
      asyncValidators: this.validateEmail.bind(this),
      updateOn: 'blur',
    }],
    password: ['', {
      asyncValidators: this.validateAdd.bind(this),
    }],
    person: this.fb.group({

      perKindDoc: ['', Validators.required],
      perNumberDoc: ['', Validators.required],
      perName: ['', Validators.required],
      perTel: ['', Validators.required]

    })
  });
  /*actualizar user */
  title = 'Añadir Usuario de Sistema';
  userBeforeUpd: User | null = null;

  constructor(
    public mediaObserver: MediaObserver, /*esta a la escucha cuando se renderiza */
    private fb: FormBuilder, /*es apra los formularios */
    private userSevice: UserService, /*creamos un servicio para conectarse a la db */
    //private showMessage: ShowMessageService, /*este servicio es para invocar los mensaje de salerta */
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: User, type: number }, /**campturamos el usuario que se recibe com parametro cuando abrimos el modal */
    private dialogRef: MatDialogRef<EditComponent>,
  ) { }

  ngOnInit(): void {
    /*observador para renderizar */
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })

    /*verifcamos y para actualizar o añadir */
    this.setTypeDialog();
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  /****METODO PARA VERIFICAR, AGREGAR O ACTUALIZAAR*** */
  setTypeDialog() {

    /**verificamos que sera actualizar, de sera asi, mostramos los datos del usuario en cada campo */
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      this.userBeforeUpd = this.paramsDialog.row;
      this.title = this.userBeforeUpd.person.perName || ''

      /*redirizar informacion en el formulario*/
      this.userForm.controls['email'].setValue(this.userBeforeUpd.email);
      this.userForm.get('person.perName')?.setValue(this.userBeforeUpd.person.perName)
      this.userForm.get('person.perTel')?.setValue(this.userBeforeUpd.person.perTel)
      this.userForm.get('person.perKindDoc')?.setValue(this.userBeforeUpd.person.perKindDoc)
      this.userForm.get('person.perNumberDoc')?.setValue(this.userBeforeUpd.person.perNumberDoc)
    }
  }

/**A TRAVES DE ESTE METODO SE DEVUELVE EL USUARIO A LA VENTA ANTERIOR */
  onReturn = (user: User): void => this.dialogRef.close(user);

  /**SE CONECTA BACKEND Y SE VERIFICA SI EXISTE O NO EL EMAIL */
  validateEmail(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userSevice.existEmail(control.value)
      .pipe(
        map((user: User) => {

          if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
            /*el usuario devuelto pod backend sera de null o vacio */
            if (!user) {
              return null;
            }
            /*en caso de ser update, verifica que el usuario devuelto sea diferente del actual */
            if (this.userBeforeUpd?.email != user.email) {
              return { existEmail: 'El correo electronico esta en uso.' };
            }
            /**si el usuario devuelto es igual al actual retorna null */
            return null
          }
          return (!user) ? null : { existEmail: 'El correo electronico esta en uso.' }
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

  /*AQUI SOLO VALIDMOS EL PASSWORD, Y ESTA ACTUALIZANDO EL PASSWORD YA NO ES REQUERIDO, ESTE VALIDATE ES PERSONALIZADO*/
  validateAdd(control: AbstractControl) {
    return new Promise((resolve, reject) => {
      if (this.paramsDialog.type == TYPES_ACTIONS_DIALOG.UPD) {
        resolve(null)
      } else {
        if (control.value == '') {
          resolve({ passwordRequired: 'El password es requerido.' })
        } else {
          resolve(null)
        }
      }
    });
  }

/*AQUI VALIDA QUE TODO ESTA OK ANTES DE RETORNAR EL USUARIO A LA VENTA ANTERIOR */
  addUpdUserWithPerson(): boolean {
    return (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) ?
      this.updUserWithPerson() :
      this.addUserWithPerson();
  }

  addUserWithPerson(): boolean {
    const user: User = this.userForm.value;
    this.onReturn(user);
    return true
  }

  updUserWithPerson(): boolean {
    const user: User = this.userForm.value;


    user.id = this.userBeforeUpd?.id
    user.person.perId = this.userBeforeUpd?.person.perId;
    this.onReturn(user)

    return true
  }
  /*DE ESTA FORMA SE VA AGREGAR, EN ALGUNOS CASOS, POR EJEMPLO DE CLIENTES POR SER MAS GRANDE */


  /* addUserWithPerson(): boolean {
     const user: User = this.userForm.value;

     this.userSevice.addUserWithPerson(user).subscribe({
       next: data => {
         console.log(data)
         this.onReturn(data.data as User[]);
         this.showMessage.success({ message: data.msg});
       },
       error: error => {
         this.showMessage.error({ message: error.error.message })
       }
     });
     return true
   }

   updUserWithPerson(): boolean {
     const user: User = this.userForm.value;

     user.id = this.userBeforeUpd?.id
     user.person.perId = this.userBeforeUpd?.person.perId;

     this.userSevice.updUserWithPerson(user).subscribe({
       next: data => {
         console.log(data)
         this.showMessage.success({ message: data.msg});

         this.onReturn(data.data as User[])
       },
       error: error => {
         this.showMessage.error({ message: error.error.message })
       }
     });
     return true
   }*/
}

interface GridResponsive {
  [key: string]: number
}

/*
export const emailMatcher = (control: AbstractpControl): {[key: string]: boolean} => {
  const email = control.get('email');
  const confirm = control.get('confirm');
  if (!email || !confirm) return null;
  if (email.value === confirm.value) {
    return null;
  }
};*/
