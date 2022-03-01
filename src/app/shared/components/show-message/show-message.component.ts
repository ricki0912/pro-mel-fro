import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatSnackBarComponent } from './components/mat-snack-bar/mat-snack-bar.component';
import { ShowMessageService } from './show-message.service';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.scss']
})
export class ShowMessageComponent implements OnInit {
  private showMessageInterface: ShowMessageInterface={
    message:''
  }

  configSuccess: MatSnackBarConfig = {
    panelClass: 'style-success',
    duration: 10000,
    horizontalPosition: 'left',
    verticalPosition: 'bottom'
  };

  constructor(private _snackBar: MatSnackBar, private showMessageService: ShowMessageService) { }

  ngOnInit(): void {
    this.showMessageService.change.subscribe((o)=>{
      this.showMessageInterface=o;

      //console.log("Nro llamadas"+th)
      console.log('***DENTRO DE MATSNACKNAT*****')
      this.openSnackBar();
    })
  }
  
  openSnackBar=()=> {
    this._snackBar.openFromComponent(MatSnackBarComponent, {
      data: this.showMessageInterface,
      ...this.configSuccess
    });
  }
  

   public error=()=>{
    this._snackBar.open("message", "Cerrar");
  }

  public succes=(msg:string)=>{
    this._snackBar.open(msg, "Cerrar");

  }



}


export interface ShowMessageInterface{
  message: string,
  status?: 'success'|'error',
  acction?():any
}



