import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-inline-edit',
  styleUrls: ['./inline-edit.component.scss'],
  template: `
    <form (ngSubmit)="onSubmit()">

      <div class="mat-subheading-2">Agrega un comentario</div>

      <section>
          <mat-button-toggle-group [(ngModel)]="spCommentColourText"   name="fontStyle" aria-label="Font Style">
            <mat-button-toggle *ngFor="let c of colours" [value]="c.clrCode" style="background-color: {{c.clrCode}} "></mat-button-toggle>
          </mat-button-toggle-group>
      </section>
     
      <mat-form-field>
        <textarea matInput
            cdkTextareaAutosize
            autofocus
            #autosize="cdkTextareaAutosize"
            cdkAutosizeMinRows="1"
            cdkAutosizeMaxRows="5" [(ngModel)]="comment" maxLength="200" name="comment" style="color: {{spCommentColourText}};"></textarea>
        <!--<input matInput maxLength="140" name="comment" [(ngModel)]="comment"> -->
        <mat-hint align="end">{{comment?.length || 0}}/200</mat-hint>
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button" color="primary" (click)="onCancel()">Cancelar</button>
        <button mat-button type="submit" color="primary">Listo</button>
      </div>
    </form>
  `
})
export class InlineEditComponent implements OnInit {

  /** Overrides the comment and provides a reset value when changes are cancelled. */
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.comment = this._value = x;
  }
  private _value = '';

  @Input() spCommentColourText:string='#000000'

  colours:Colour[]=[
    {clrCode: '#FF0000'},	{clrCode: '#FFFFFF'},
    {clrCode: '#00FFFF'},	{clrCode: '#C0C0C0'},
    {clrCode: '#0000FF'}, {clrCode: '#808080'},
    {clrCode: '#00008B'},	{clrCode: '#000000'},
    {clrCode: '#ADD8E6'},	{clrCode: '#FFA500'},
    {clrCode: '#800080'},	{clrCode: '#A52A2A'},
    {clrCode: '#FFFF00'},	{clrCode: '#800000'},
    {clrCode: '#00FF00'},	{clrCode: '#008000'},
    {clrCode: '#FF00FF'},	{clrCode: '#808000'},
    {clrCode: '#FFC0CB'},	{clrCode: '#7FFD4'}]


  /** Form model for the input. */
  comment = '';

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.comment = this.value || '');
    }
  }

  onSubmit() {
    if (this.popover) {
      let c:CommentR={value: this.comment,spCommentColourText: this.spCommentColourText }
      this.popover.close(c);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }

}

export interface Colour{
  clrCode:string
}

export interface CommentR{
  value:string, 
  spCommentColourText:string
}