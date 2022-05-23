
import { Component, Inject, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { Period } from 'src/app/interfaces/period';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  title = 'Añadir Nuevo Periodo';
  periodBeforeUpd: Period | null = null;

  constructor(
    public mediaObserver: MediaObserver, /*esta a la escucha cuando se renderiza */
    private fb: FormBuilder, /*es apra los formularios */
    //private showMessage: ShowMessageService, /*este servicio es para invocar los mensaje de alerta */
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Period, type: number }, /**campturamos el usuario que se recibe com parametro cuando abrimos el modal */
    private dialogRef: MatDialogRef<EditComponent>,
  ) { }

  ngOnInit(): void {
    /*observador para renderizar */
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })

    /*verifcamos y para actualizar o añadir */
    this.setTypeDialog();
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

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
  periodForm: FormGroup = this.fb.group({
    prdsNameShort : ['',Validators.required],
    prdsDescription : ['',Validators.required],
    prdsState : ['',Validators.required]
  });


  /****METODO PARA VERIFICAR, AGREGAR O ACTUALIZAAR*** */
  setTypeDialog() {

    /**verificamos que sera actualizar, de sera asi, mostramos los datos del usuario en cada campo */
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      this.periodBeforeUpd = this.paramsDialog.row;
      this.title = 'Periodo '+this.periodBeforeUpd.prdsNameShort || ' no seleccionado'

      /*redirizar informacion en el formulario*/
      this.periodForm.get('prdsNameShort')?.setValue(this.periodBeforeUpd.prdsNameShort);
      this.periodForm.get('prdsDescription')?.setValue(this.periodBeforeUpd.prdsDescription);
      //this.periodForm.get('prdsState')?.setValue(this.periodBeforeUpd.prdsState);
      this.periodForm.controls['prdsState'].setValue(String(this.periodBeforeUpd.prdsState));


    }
  }

/**A TRAVES DE ESTE METODO SE DEVUELVE EL NEGOCIO A LA VENTANA ANTERIOR */
  private onReturn = (r: Period): void => this.dialogRef.close(r);

  /*AQUI VALIDA QUE TODO ESTA OK ANTES DE RETORNAR EL USUARIO A LA VENTA ANTERIOR */
  private addPeriod(): boolean {
    const period: Period = this.periodForm.value;
    console.log("*period add**",period)

    this.onReturn(period);
    return true;
  }

  private updPeriod(): boolean {
    const period : Period = this.periodForm.value;
    period.prdsId = this.periodBeforeUpd?.prdsId;
    console.log("*period upd**",period)
    this.onReturn(period);
    return true;
  }

  addUpdPeriod(): boolean{
    return (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) ?
    this.updPeriod():
    this.addPeriod();

  }

}

interface GridResponsive {
  [key: string]: number
}
