import { EventEmitter, Injectable, Output } from '@angular/core';
import { AppointmentTemp } from 'src/app/interfaces/appointment-temp';

@Injectable({
  providedIn: 'root'
})
export class FloatingWaitingLineService {
  @Output() onControl= new EventEmitter<string>()
  @Output() onNotification= new EventEmitter<AppointmentTemp>()

  constructor() {   
  }

  public setNotification(a:AppointmentTemp){
    this.onNotification.emit(a)
  }



}
