import { Component, OnInit } from '@angular/core';
import { HeadService } from './head.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  public message:string=''
  constructor(private headService:HeadService) {
    
   }

  ngOnInit(): void {
    this.headService.onMessage.subscribe(d =>{
      this.message=d
      })
  
  }
  


}
