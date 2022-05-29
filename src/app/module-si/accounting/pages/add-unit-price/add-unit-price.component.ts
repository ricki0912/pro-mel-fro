import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-add-unit-price',
  styleUrls: ['./add-unit-price.component.scss'],
  template: `
    <form (ngSubmit)="onSubmit()">
      <div class="mat-subheading-2">Agregar Precio (S/)</div>

      <mat-form-field>
        <input matInput autocomplete="off"  maxLength="14" name="amount" [(ngModel)]="amount">
        <mat-hint align="end">{{amount?.length || 0}}/12</mat-hint>
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button" color="primary" (click)="onCancel()">Cancelar</button>
        <button mat-button type="submit" color="primary">Listo</button>
      </div>
    </form>
  `
})
export class AddUnitPriceComponent implements OnInit {

  /** Overrides the comment and provides a reset value when changes are cancelled. */
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.amount = this._value = x;
  }
  private _value = '';

  /** Form model for the input. */
  amount = '';

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.amount = this.value || '');
    }
  }

  onSubmit() {
    if (this.popover) {
      this.popover.close(this.amount);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }

}
