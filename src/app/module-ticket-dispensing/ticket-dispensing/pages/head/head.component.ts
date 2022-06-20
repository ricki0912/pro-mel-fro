import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomMenuComponent } from '../bottom-menu/bottom-menu.component';
import { HeadService } from './head.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  public message:string=''
  constructor(private headService:HeadService, private _bottomSheet: MatBottomSheet) {
    
   }

  ngOnInit(): void {
    this.headService.onMessage.subscribe(d =>{
      this.message=d
      })
  
  }


  openBottomMenu(): void {
    this._bottomSheet.open(BottomMenuComponent);
      
      
    /*clickCount = 0;
click() {
    this.clickCount++;
    setTimeout(() => {
        if (this.clickCount === 1) {
             // single
        } else if (this.clickCount === 2) {
            // double
        }
        this.clickCount = 0;
    }, 250)
} */
  }



}
