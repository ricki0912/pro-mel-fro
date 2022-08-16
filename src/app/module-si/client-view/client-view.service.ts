import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bussines } from 'src/app/interfaces/bussines';
import { TServicesProvided } from 'src/app/interfaces/services-provided';

@Injectable({
  providedIn: 'root'
})
export class ClientViewService {
  private selectedBussines = new BehaviorSubject<Bussines | null>(null);

  private servicesProvideds=new EventEmitter<TServicesProvided[]>()

  constructor(
   
  ) { 

  }

  onSelectedBussines(business:Bussines){
     this.selectedBussines.next(business)
  }
  getSelectedBussines(){
    return this.selectedBussines
  }
  //onServicesProvided=(t:TServicesProvided)=>this.

  


}
