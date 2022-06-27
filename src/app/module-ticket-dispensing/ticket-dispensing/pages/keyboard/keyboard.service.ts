import {  Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  @Output() onValue = new BehaviorSubject<string | null>(null)
  constructor() { 

  }

  public setValue(s:string |null){
    this.onValue.next(s)
  }

}
