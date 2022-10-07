import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bussines } from 'src/app/interfaces/bussines';
import { Services } from 'src/app/interfaces/services';
import { TServicesProvided } from 'src/app/interfaces/services-provided';
import { Teller } from 'src/app/interfaces/teller';

@Injectable({
  providedIn: 'root'
})
export class ClientViewService {
  private selectedBussines = new BehaviorSubject<Bussines | null>(null);
  private services = new BehaviorSubject<Services[] | null>(null);
  private teller = new BehaviorSubject<Teller | null>(null);



  private servicesProvideds=new EventEmitter<TServicesProvided[]>()


  constructor(
   
  ) { 

  }

  onSelectedBussines=(business:Bussines)=>this.selectedBussines.next(business)
     
  getSelectedBussines=()=>this.selectedBussines

  /*Servicios */
  onServices=(s:Services[])=>this.services.next(s)
    
  getServices=()=>this.services

  /*teller */
  onTeller=(t:Teller)=>this.teller.next(t);

  getTeller=()=>this.teller

  //onServicesProvided=(t:TServicesProvided)=>this.

  


}
