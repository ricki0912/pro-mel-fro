

import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-add-description',
  templateUrl: './add-description.component.html',
  styleUrls: ['./add-description.component.scss']
})
export class AddDescriptionComponent implements OnInit {

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
