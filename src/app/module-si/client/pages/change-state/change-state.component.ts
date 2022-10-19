import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-state',
  templateUrl: './change-state.component.html',
  styleUrls: ['./change-state.component.scss']
})
export class ChangeStateComponent implements OnInit {

  title = "Seleccionar Estado";
  date = new FormControl(new Date());

  constructor(
    private dialogRef: MatDialogRef<ChangeStateComponent>
  ) { }

  ngOnInit(): void {
  }

  selectRadio: number = 0;
  states: state[] = [
    {name: 'Activo', value: 1},
    {name: 'Suspendido', value: 2},
    {name: 'Retirado', value: 3},
  ];

  onReturn = (bs: BusinessState): void => this.dialogRef.close(bs);

  ok() {
    const bs: BusinessState={bussState:this.selectRadio, bussStateDate:this.date.value};
    //const t=this.selectRadio;
    //console.log(t);

    if(bs.bussState &&  bs.bussStateDate){
      this.onReturn(bs);
    }
  }

}

export interface state {
  name: string;
  value: number;
}

export interface BusinessState{
  bussState:number,
  bussStateDate:Date
}
