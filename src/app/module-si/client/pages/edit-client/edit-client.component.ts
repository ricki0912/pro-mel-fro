import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { map, Observable, Subscription } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bussines, TellerJoinUsers } from 'src/app/interfaces/bussines';
import { BussinesService } from 'src/app/services/bussines.service';
import { Person } from 'src/app/interfaces/person';
import { PersonService } from 'src/app/services/person.service';
import { MainViewService } from 'src/app/module-si/main-view/main-view.service';
import { BusinessHelpers } from 'src/app/global/helpers/business.helpers';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit, OnDestroy {

  title = 'Añadir un Cliente Nuevo';
  businessBeforeUpd: Bussines | null = null;
  tellers: TellerJoinUsers[] = [];
  private hqId:number=0;
  bh: BusinessHelpers = new BusinessHelpers();

  constructor(
    public mediaObserver: MediaObserver, /*esta a la escucha cuando se renderiza */
    private fb: FormBuilder, /*es apra los formularios */
    private businessSevice: BussinesService, /*creamos un servicio para conectarse a la db */
    private personService: PersonService,
    //private showMessage: ShowMessageService, /*este servicio es para invocar los mensaje de alerta */
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Bussines, type: number, idSede: number }, /**campturamos el usuario que se recibe com parametro cuando abrimos el modal */
    private dialogRef: MatDialogRef<EditClientComponent>,
    private mainViewService:MainViewService
  ) { }

  ngOnInit(): void {
    /*observador para renderizar */
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })

    /*verifcamos y para actualizar o añadir */
    this.setTypeDialog();
    this.readTeller(this.paramsDialog.idSede);
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

  /*Formulario para añadir negocio con persona */
  businessForm: FormGroup = this.fb.group({
    business : this.fb.group({
      bussKind : ['',Validators.required],
      bussName : ['',Validators.required],
      bussRUC : ['', {
        validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("[0-9]{11}")],
        asyncValidators: this.validateRuc.bind(this),
        updateOn: 'blur',
      }],
      bussAddress :[''],
      bussFileKind : ['',Validators.required],
      bussFileNumber : ['', {
        validators: [Validators.required],
        asyncValidators: this.validateFileNumber.bind(this),
        updateOn: 'blur',
      }],
      bussDateStartedAct :[''],
      bussDateMembership :[''],
      tellId : ['',Validators.required]
    }),
    person: this.fb.group({

      perKindDoc: ['', Validators.required],
      perNumberDoc : ['', {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("[0-9]{8}")],
        asyncValidators: this.validateDNI.bind(this),
        updateOn: 'blur',
      }],
      perName: ['', Validators.required],
      perTel :['', {validators: [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern("[9]{1}[0-9]{8}")]}]
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
      this.businessForm.get('business.bussAddress')?.setValue(this.businessBeforeUpd.bussAddress)
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

/**A TRAVES DE ESTE METODO SE DEVUELVE EL NEGOCIO A LA VENTANA ANTERIOR */
  onReturn = (business: Bussines): void => this.dialogRef.close(business);

  /**SE CONECTA BACKEND Y SE VERIFICA SI EXISTE EL RUC */
  validateRuc(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.businessSevice.existRuc(control.value)
    .pipe(
      map((business: Bussines) => {
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

  /**SE CONECTA BACKEND Y SE VERIFICA SI EXISTE EL NUMERO DE ARCHIVADOR */
  validateFileNumber(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.businessSevice.existFileNumber(control.value)
    .pipe(
      map((business: Bussines) => {
        if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
          /*el usuario devuelto por backend sera de null o vacio */
          if (!business) {
            return null;
          }
          /*en caso de ser update, verifica que el usuario devuelto sea diferente del actual */
          if (this.businessBeforeUpd?.bussFileNumber != business.bussFileNumber) {
            return { existFileNumber: 'El Numero de Archivador ya esta en uso.' };
          }
          /**si el usuario devuelto es igual al actual retorna null */
          return null
        }
        return (!business) ? null : { existFileNumber: 'El Numero de Archivador ya existe.' }
      })
    )
  }

  validateDNI(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.personService.existDni(control.value)
    .pipe(
      map((person: Person) => {
        if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
          /*el usuario devuelto por backend sera de null o vacio */
          if (!person) {
            return null;
          }
          /*en caso de ser update, verifica que el usuario devuelto sea diferente del actual */
          if (this.businessBeforeUpd?.person.perNumberDoc != person.perNumberDoc) {
            return { existDni: 'El Numero de DNI ya esta en uso.' };
          }
          /**si el usuario devuelto es igual al actual retorna null */
          return null
        }
        return (!person) ? null : { existDni: 'El Numero de DNI ya existe.' }
      })
    )
  }

  /*AQUI VALIDA QUE TODO ESTA OK ANTES DE RETORNAR EL USUARIO A LA VENTA ANTERIOR */
  addBusinessWithPerson(): boolean {
    const business: Bussines = this.businessForm.value;
    this.onReturn(business);
    return true
  }

  private readTeller(hqId:number) {
    console.log("captirado", hqId);
    this.businessSevice.getTellerJoinUsers(hqId).subscribe({
      next: d => this.tellers = d.data  as TellerJoinUsers[]
    })
  }
}

interface GridResponsive {
  [key: string]: number
}
