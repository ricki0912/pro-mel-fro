import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeadService {
  @Output() onMessage = new EventEmitter<string>()
  constructor() { 

  } 
  public setMessage=(m:string)=>{
    this.onMessage.emit(m)
  }

  
}
 