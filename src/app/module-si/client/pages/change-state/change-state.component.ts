import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-state',
  templateUrl: './change-state.component.html',
  styleUrls: ['./change-state.component.scss']
})
export class ChangeStateComponent implements OnInit {

  title = "Seleccionar Estado";

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

  onReturn = (state: number): void => this.dialogRef.close(state);

  ok() {
    const t=this.selectRadio;
    //console.log(t);

    if(t){
      this.onReturn(t);
    }
  }

}

export interface state {
  name: string;
  value: number;
}

