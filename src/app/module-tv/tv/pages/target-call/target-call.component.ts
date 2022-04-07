import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppointmentTemp } from 'src/app/interfaces/appointment-temp';

@Component({
  selector: 'app-target-call',
  templateUrl: './target-call.component.html',
  styleUrls: ['./target-call.component.scss']
})
export class TargetCallComponent implements OnInit, OnChanges{
  @Input() tAppointmentTemp:AppointmentTemp={}
  
  
  constructor() { }

  ngOnInit(): void {
    
    console.log(this.tAppointmentTemp)
  }
  
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log("**Hola**", changes)
  }

  joinCodeTicket(element: AppointmentTemp) {
    return element.catCode + String(element.apptmNro).padStart(2, '0')
  }

  /*public wasCalled(apptmNroCalls:number){
    console.log(this.tAppointmentTemp)  
    return true
  }*/





}
