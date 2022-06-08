import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bussines } from 'src/app/interfaces/bussines';

@Injectable({
  providedIn: 'root'
})
export class ClientViewService {
  private selectedBussines = new BehaviorSubject<Bussines | null>(null);
  
  constructor(
   
  ) { 

  }

  onSelectedBussines(business:Bussines){
     this.selectedBussines.next(business)
  }
  getSelectedBussines(){
    return this.selectedBussines
  }
}
