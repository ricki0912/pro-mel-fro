import { Injectable , Output, EventEmitter} from '@angular/core';
import { ShowMessageInterface } from './show-message.component';


@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  @Output() change:EventEmitter<ShowMessageInterface> =new EventEmitter()

  constructor() { }
  
  public success=(o:ShowMessageInterface)=>{
    o.status='success'
    this.change.emit(o)
  }

  
  public error=(o:ShowMessageInterface)=>{
    o.status='error'
    this.change.emit(o)
  }
}
