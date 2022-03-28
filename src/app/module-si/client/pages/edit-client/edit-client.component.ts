import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { map, Observable, Subscription } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bussines } from 'src/app/interfaces/bussines';
import { BussinesService } from 'src/app/services/bussines.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit, OnDestroy {

  title = 'Añadir un Cliente Nuevo';
  businessBeforeUpd: Bussines | null = null;

  constructor(
    public mediaObserver: MediaObserver, /*esta a la escucha cuando se renderiza */
    private fb: FormBuilder, /*es apra los formularios */
    private businessSevice: BussinesService, /*creamos un servicio para conectarse a la db */
    //private showMessage: ShowMessageService, /*este servicio es para invocar los mensaje de alerta */
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Bussines, type: number }, /**campturamos el usuario que se recibe com parametro cuando abrimos el modal */
    private dialogRef: MatDialogRef<EditClientComponent>,
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

  /*Para las fechas de hoy*/
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  /*Para las fechas de hoy*/

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
  businessForm: FormGroup = this.fb.group({
    business : this.fb.group({
      bussKind : ['',Validators.required],
      bussName : ['',Validators.required],
      bussRUC : ['', {
        validators: [Validators.required],
        asyncValidators: this.validateRuc.bind(this),
        updateOn: 'blur',
      }],
      bussAddress :[''],
      bussFileKind : ['',Validators.required],
      bussFileNumber : ['',Validators.required],
      bussDateStartedAct :[''],
      bussDateMembership :['']
    }),
    person: this.fb.group({

      perKindDoc: ['', Validators.required],
      perNumberDoc: ['', Validators.required],
      perName: ['', Validators.required],
      perTel :['']
    })
  });


  /****METODO PARA VERIFICAR, AGREGAR O ACTUALIZAAR*** */
  setTypeDialog() {

    /**verificamos que sera actualizar, de sera asi, mostramos los datos del usuario en cada campo */
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      this.businessBeforeUpd = this.paramsDialog.row;
      this.title = this.businessBeforeUpd.person.perName || ''

      /*redirizar informacion en el formulario*/
      this.businessForm.get('business.bussKind')?.setValue(this.businessBeforeUpd.bussKind)
      this.businessForm.get('business.bussName')?.setValue(this.businessBeforeUpd.bussName)
      this.businessForm.get('business.bussRUC')?.setValue(this.businessBeforeUpd.bussRUC)
      this.businessForm.get('business.bussAddress')?.setValue(this.businessBeforeUpd.bussAdress)
      this.businessForm.get('business.bussFileKind')?.setValue(this.businessBeforeUpd.bussFileKind)
      this.businessForm.get('business.bussFileNumber')?.setValue(this.businessBeforeUpd.bussFileNumber)
      this.businessForm.get('business.bussDateStartedAct')?.setValue(this.businessBeforeUpd.bussDateStartedAct)
      this.businessForm.get('business.bussDateMembership')?.setValue(this.businessBeforeUpd.bussDateMembership)

      this.businessForm.get('person.perKindDoc')?.setValue(this.businessBeforeUpd.person.perKindDoc)
      this.businessForm.get('person.perNumberDoc')?.setValue(this.businessBeforeUpd.person.perNumberDoc)
      this.businessForm.get('person.perName')?.setValue(this.businessBeforeUpd.person.perName)
      this.businessForm.get('person.perTel')?.setValue(this.businessBeforeUpd.person.perTel)
    }
  }

/**A TRAVES DE ESTE METODO SE DEVUELVE EL USUARIO A LA VENTA ANTERIOR */
  onReturn = (business: Bussines): void => this.dialogRef.close(business);

  /**SE CONECTA BACKEND Y SE VERIFICA SI EXISTE O NO EL EMAIL */
  validateRuc(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.businessSevice.existRuc(control.value)
    .pipe(
      map((business: Bussines) => {
          console.log("Estoy dentro de",business);

        if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
          /*el usuario devuelto pod backend sera de null o vacio */
          if (!business) {
            return null;
          }
          /*en caso de ser update, verifica que el usuario devuelto sea diferente del actual */
          if (this.businessBeforeUpd?.bussRUC != business.bussRUC) {
            return { existRuc: 'El numero de RUC esta en uso.' };
          }
          /**si el usuario devuelto es igual al actual retorna null */
          return null
        }
        return (!business) ? null : { existRuc: 'El numero de RUC ya existe.' }
      })
    )
  }

  /*AQUI SOLO VALIDMOS EL PASSWORD, Y ESTA ACTUALIZANDO EL PASSWORD YA NO ES REQUERIDO, ESTE VALIDATE ES PERSONALIZADO*/
  /*validateAdd(control: AbstractControl) {
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
  }*/

/*AQUI VALIDA QUE TODO ESTA OK ANTES DE RETORNAR EL USUARIO A LA VENTA ANTERIOR */
  addBusinessWithPerson(): boolean {
    return (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) ?
      this.updUserWithPerson() :
      this.addUserWithPerson();
  }

  addUserWithPerson(): boolean {
    const business: Bussines = this.businessForm.value;
    this.onReturn(business);
    return true
  }

  updUserWithPerson(): boolean {
    const business: Bussines = this.businessForm.value;


    business.bussId = this.businessBeforeUpd?.bussId
    business.person.perId = this.businessBeforeUpd?.person.perId;
    this.onReturn(business)

    return true
  }

  public mostradata (data:any): void {
    console.log(data, "devuelto por solis");
  }
}

interface GridResponsive {
  [key: string]: number
}
