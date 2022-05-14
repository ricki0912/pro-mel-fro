import { Injectable , Output, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  @Output() changeState:EventEmitter<number> =new EventEmitter()
  @Output() changeStop:EventEmitter<number> =new EventEmitter()

  constructor() { }
  
  public show=()=>this.changeState.emit(1)
  public hide=()=>this.changeState.emit(-1)
  public stop=()=>this.changeStop.emit(0)

}
