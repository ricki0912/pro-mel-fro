import { Component, Host, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-dialog-edit-one-input',
  templateUrl: './dialog-edit-one-input.component.html',
  styleUrls: ['./dialog-edit-one-input.component.scss']
})
export class DialogEditOneInputComponent implements OnInit {
  get value(): string { return this._value; }
  set value(x: string) {
    this.amount = this._value = x;
  }
  private _value = '';
  private _maxLength:number=50
  get maxLength():number{return this._maxLength}
  private _title:string='Agregar Dato'
  get title():string{return this._title}
  /** Form model for the input. */
  amount = '';

  constructor(public dialog: MatDialogRef<DialogEditOneInputComponent>,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { value: string, title:string, maxLength:number}) { }

  ngOnInit():void {
    // subscribe to cancellations and reset form value
    if (this.paramsDialog.value) {
      this.value=this.paramsDialog.value  
    }
    if(this.paramsDialog.maxLength){
      this._maxLength=this.paramsDialog.maxLength
    }
    if(this.paramsDialog.title){
      this._title=this.paramsDialog.title
    }

  }

  private onReturn=(r?:string)=>this.dialog.close(r)
  onSubmit() {
    this.onReturn(this.value);
  }
  onCancel(){
    this.onReturn();
  }


}


