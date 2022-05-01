import { EventEmitter, Injectable, Output } from '@angular/core';
import { AppointmentTemp } from 'src/app/interfaces/appointment-temp';

@Injectable({
  providedIn: 'root'
})
export class FloatingWaitingLineService {
  @Output() onControl= new EventEmitter<number>()
  @Output() onNotification= new EventEmitter<AppointmentTemp>()


  constructor() {   
  }

  public setNotification(a:AppointmentTemp){
    this.onNotification.emit(a)
  }
  public setControl(c:number){
    this.onControl.emit(c)
  }

  public diminish(){
    this.onControl.emit(FWLS_CONTROL.DIMINISH)
  }
  public increase(){
    this.onControl.emit(FWLS_CONTROL.INCREASE)
  }

  public hide(){
    this.onControl.emit(FWLS_CONTROL.HIDE)
  }



}

export enum FWLS_CONTROL {
  DIMINISH=1,HIDE=2, INCREASE=3
}
