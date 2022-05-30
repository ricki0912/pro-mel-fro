import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';
import { PeriodPayment } from 'src/app/interfaces/period-payment';

@Component({
  selector: 'app-add-period',
  styleUrls: ['./add-period.component.scss'],
  template: `
    <form [formGroup]="pdForm">
      <div class="mat-subheading-2">Agregar Perido</div>
      <mat-form-field appearance="fill">
        <mat-label>Periodo</mat-label>
        <mat-select formControlName="period">
          <mat-option *ngFor="let pd of periodPayments" [value]="pd.ppayId">
            {{pd.ppayName}}
          </mat-option>
        </mat-select>
        <mat-error> EL perido es requerido. </mat-error>
      </mat-form-field>
      <div class="actions">
        <button mat-button type="button" color="primary" (click)="onCancel()">Cancelar</button>
        <button mat-button type="submit" [disabled]="!pdForm.valid" (click)="addPd()" color="primary">Listo</button>
      </div>
    </form>
  `
})
export class AddPeriodComponent implements OnInit {

  /** Overrides the comment and provides a reset value when changes are cancelled. */
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.pd = this._value = x;
  }
  @Input() periodPayments:PeriodPayment[]=[]

  private _value = '';

  /** Form model for the input. */
  pd = '';

  constructor(@Optional() @Host() public popover: SatPopover, private fb: FormBuilder) { }

  pdForm: FormGroup = this.fb.group({
    period : ['',Validators.required],
  });

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.pd = this.value || '');
    }
  }

  addPd() {
    if (this.popover) {
      this.popover.close(this.pdForm.value);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close('hide');
    }
  }

  /*period: Period[] = [
    {value: '1', name: 'Enero'},
    {value: '2', name: 'Febrero'},
    {value: '3', name: 'Marzo'},
    {value: '4', name: 'Abril'},
    {value: '5', name: 'Mayo'},
    {value: '6', name: 'Junio'},
    {value: '7', name: 'Julio'},
    {value: '8', name: 'Agosto'},
    {value: '9', name: 'Setiembre'},
    {value: '10', name: 'Octubre'},
    {value: '11', name: 'Noviembre'},
    {value: '12', name: 'Diciembre'},
  ];
*/
}

/*interface Period {
  value: string;
  name: string;
}*/
