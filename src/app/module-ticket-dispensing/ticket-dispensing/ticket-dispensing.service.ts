import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketDispensingService {
  @Output() onMessage = new EventEmitter<string>()
  @Output() onViewFindBusiness=new EventEmitter<string>()
  @Output() onComeBack=new EventEmitter<boolean>();
  @Output() onGoHome=new EventEmitter<boolean>()
  constructor() { 

  } 
  public setMessage=(m:string)=>{
    this.onMessage.emit(m)
  }

  public showViewFindBusiness(){

  }

  public comeBack(){
    this.onComeBack.emit(true)
  }
  public goHome(){
    this.onGoHome.emit(true)
  }

}
