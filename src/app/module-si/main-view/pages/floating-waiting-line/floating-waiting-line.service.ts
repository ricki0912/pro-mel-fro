import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppointmentTemp, TAppointmentTemp } from 'src/app/interfaces/appointment-temp';

@Injectable({
  providedIn: 'root'
})
export class FloatingWaitingLineService {
  @Output() onControl= new EventEmitter<number>()
  @Output() onNotification= new EventEmitter<AppointmentTemp>()

  private currentAttentionTAppointment = new BehaviorSubject<TAppointmentTemp | null>(null);

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
  public show(){
    this.onControl.emit(FWLS_CONTROL.SHOW)
  }

/*Metodos para actencion actual  */
onCurrentAttention(t:TAppointmentTemp | null){
  this.currentAttentionTAppointment.next(t)
}
getCurrentAttion(){
 return this.currentAttentionTAppointment
}

}

export enum FWLS_CONTROL {
  DIMINISH=1,HIDE=2, INCREASE=3, SHOW=4
}
