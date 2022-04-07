import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { AppointmentTemp } from '../interfaces/appointment-temp';

@Injectable({
  providedIn: 'root'
})
export class WaitingLineService {

  constructor(private socket: Socket) { 

  }

  public sendMessage(message:string):void{
    this.socket.emit('sendMessage', message)
  }

  public getNewMessage():Observable<string>{
    return this.socket.fromEvent<string>('newMessage');
  }

  /*sendAppointmentTemp */

  public setTVAddTargetCall(appointmentTemp:AppointmentTemp):void{
    this.socket.emit('tv:set:add-target-call', appointmentTemp);
  }

  public getTVAddTargetCall():Observable<AppointmentTemp>{
    return this.socket.fromEvent<AppointmentTemp>('tv:get:add-target-call')
  }
  



  public setTVRefreshTargetCall(appointmentTemp:AppointmentTemp):void{
    this.socket.emit('tv:set:refresh-target-call', appointmentTemp);
  }

  public getTVRefreshTargetCall():Observable<AppointmentTemp>{
    return this.socket.fromEvent<AppointmentTemp>('tv:get:refresh-target-call')
  }

}