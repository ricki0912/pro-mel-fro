import { EventEmitter, Injectable, Output } from '@angular/core';
import { ALERT_STATE, AlertInterface } from './alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  @Output() onAlert = new EventEmitter<AlertInterface>()

  constructor() { }

  public success=(m:AlertInterface)=>{
    m.state=ALERT_STATE.SUCCESS
    this.onAlert.emit(m)
  }
  public error=(m:AlertInterface)=>{
    m.state=ALERT_STATE.ERROR
    this.onAlert.emit(m)
  }
}
