import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-add-services',
  styleUrls: ['./add-services.component.scss'],
  template: `
    <form [formGroup]="svForm">
      <div class="mat-subheading-2">Agregar Servicio</div>
      <mat-form-field appearance="fill">
        <mat-label>Servicio</mat-label>
        <mat-select formControlName="name">
          <mat-option *ngFor="let sv of services" [value]="sv.value">
            {{sv.name}}
          </mat-option>
        </mat-select>
        <mat-error> EL servicio es requerido. </mat-error>
      </mat-form-field>
      <div class="actions">
        <button mat-button type="button" color="primary" (click)="onCancel()">Cancelar</button>
        <button mat-button type="submit" [disabled]="!svForm.valid" (click)="addSv()" color="primary">Listo</button>
      </div>
    </form>
  `
})
export class AddServicesComponent implements OnInit {

  /** Overrides the comment and provides a reset value when changes are cancelled. */
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.sv = this._value = x;
  }
  private _value = '';

  /** Form model for the input. */
  sv = '';

  constructor(@Optional() @Host() public popover: SatPopover, private fb: FormBuilder) { }

  svForm: FormGroup = this.fb.group({
    name : ['',Validators.required],
  });

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.sv = this.value || '');
    }
  }

  addSv() {
    if (this.popover) {
      this.popover.close(this.svForm.value);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close('hide');
    }
  }

  services: Services[] = [
    {value: '1', name: 'Declaracion Jurada'},
    {value: '2', name: 'Concecionarias'},
    {value: '3', name: 'Otros'},
  ];

}

interface Services {
  value: string;
  name: string;
}
