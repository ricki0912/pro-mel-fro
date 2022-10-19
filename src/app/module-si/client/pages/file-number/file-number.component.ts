import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Bussines, BUSSINES_COLOR, BUSSINES_STATE } from 'src/app/interfaces/bussines';
import { BussinesService } from 'src/app/services/bussines.service';

@Component({
  selector: 'app-file-number',
  templateUrl: './file-number.component.html',
  styleUrls: ['./file-number.component.scss']
})
export class FileNumberComponent implements OnInit {

  business:Bussines[]=[]


  title = "Archivador en uso ";
  labelPosition: 'before' |'' | 'after' = 'after';
  since=1
  array= Array(5000).fill(110);


  constructor(
    private dialogRef: MatDialogRef<FileNumberComponent>, 
    private bussinesService: BussinesService,

  ) { }

  ngOnInit(): void {
    this.allFileNumbers()
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

  

  private allFileNumbers() {
    this.bussinesService.allFileNumbers()?.subscribe({
      next: (d) => {
        this.business = d

      }
    })
  }

  getColorBussState(bussState?:string){
    switch(Number(bussState)){
      case BUSSINES_STATE.ENABLE:
          return BUSSINES_COLOR.ENABLE;
      case BUSSINES_STATE.SUSPENDED:
        return BUSSINES_COLOR.SUSPENDED
      case BUSSINES_STATE.RETIRED:
        return BUSSINES_COLOR.RETIRED
      default:
        return '';
    }
  }

}

export interface state {
  name: string;
  value: number;
}

