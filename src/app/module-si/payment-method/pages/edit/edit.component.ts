
import { Component, Inject, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';

import {PaymentMethod} from 'src/app/interfaces/payment-method'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  title = 'Añadir Nuevo Método de Pago';
  paymentMethodBeforeUpd: PaymentMethod | null = null;

  constructor(
    public mediaObserver: MediaObserver, /*esta a la escucha cuando se renderiza */
    private fb: FormBuilder, /*es apra los formularios */
    //private showMessage: ShowMessageService, /*este servicio es para invocar los mensaje de alerta */
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: PaymentMethod, type: number }, /**campturamos el usuario que se recibe com parametro cuando abrimos el modal */
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
  paymentMethodForm: FormGroup = this.fb.group({
    paymthdsName : ['',Validators.required],
    paymthdsState : ['',Validators.required]
  });


  /****METODO PARA VERIFICAR, AGREGAR O ACTUALIZAAR*** */
  setTypeDialog() {

    /**verificamos que sera actualizar, de sera asi, mostramos los datos del usuario en cada campo */
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      this.paymentMethodBeforeUpd = this.paramsDialog.row;
      this.title = 'Método de Pago '+this.paymentMethodBeforeUpd.paymthdsName || ' no seleccionado'

      /*redirizar informacion en el formulario*/
      this.paymentMethodForm.get('paymthdsName')?.setValue(this.paymentMethodBeforeUpd.paymthdsName);
      this.paymentMethodForm.controls['paymthdsState'].setValue(String(this.paymentMethodBeforeUpd.paymthdsState));


    }
  }

/**A TRAVES DE ESTE METODO SE DEVUELVE EL NEGOCIO A LA VENTANA ANTERIOR */
  private onReturn = (r: PaymentMethod): void => this.dialogRef.close(r);

  /*AQUI VALIDA QUE TODO ESTA OK ANTES DE RETORNAR EL USUARIO A LA VENTA ANTERIOR */
  private addPaymentMethod(): boolean {
    const p: PaymentMethod = this.paymentMethodForm.value;
    console.log("*period add**",p)

    this.onReturn(p);
    return true;
  }

  private updPaymentMethod(): boolean {
    const p : PaymentMethod = this.paymentMethodForm.value;
    p.paymthdsId = this.paymentMethodBeforeUpd?.paymthdsId;
    console.log("*period upd**",p)
    this.onReturn(p);
    return true;
  }

  addUpdPaymentMethod(): boolean{
    return (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) ?
    this.updPaymentMethod():
    this.addPaymentMethod();

  }

}

interface GridResponsive {
  [key: string]: number
}
