import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ShowMessageInterface } from '../../show-message.component';

@Component({
  selector: 'app-mat-snack-bar',
  templateUrl: './mat-snack-bar.component.html',
  styleUrls: ['./mat-snack-bar.component.scss']
})
export class MatSnackBarComponent implements OnInit {
  existAction:boolean=false;
  titleButtonRetry:string="Reintentar";
  constructor(public snackBarRef: MatSnackBarRef<MatSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: ShowMessageInterface) { }

  ngOnInit(): void {
    if(typeof this.data.action!=='undefined'){
      this.existAction=true
      this.titleButtonRetry=(this.data.titleButtonRetry)?this.data.titleButtonRetry:"Reintentar";
    }
  }
  
  onAction(){
    if(typeof this.data.action !== 'undefined'){
      this.data.action() 
    } 
  }
}
