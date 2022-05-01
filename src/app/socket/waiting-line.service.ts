import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { SocketInterface } from '../global/parents/socket.interface';
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

  /*optimizado */
  public setSocketTV(hqId:number, s:SocketInterface<AppointmentTemp>):void{
    this.socket.emit('tv:set', {hqId:hqId,data:s});
  }

  public getSocketTV(hqId:number):Observable<SocketInterface<AppointmentTemp>>{
    return this.socket.fromEvent<SocketInterface<AppointmentTemp>>('tv:get:'+hqId)
  }

  public setSocketLineWaiting(tellId:number, s:SocketInterface<AppointmentTemp>):void{
    this.socket.emit('waiting-line:set', {tellId:tellId, data:s});
  }

  public getSocketWaitingLine(tellId:number):Observable<SocketInterface<AppointmentTemp>>{
    return this.socket.fromEvent<SocketInterface<AppointmentTemp>>('waiting-line:get:'+tellId)
  }
}