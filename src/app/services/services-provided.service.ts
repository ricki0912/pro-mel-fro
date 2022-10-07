import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudApiInterface } from '../global/interfaces/crud-api.interface';
import { ParentInterface, InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { ServicesProvided } from '../interfaces/services-provided';

@Injectable({
  providedIn: 'root'
})
export class ServicesProvidedService extends ParentService implements CrudApiInterface {

  private API_SERVICES_PROVIDED=`${this.HOST_API}/api/v1/services-provided`

  constructor(private https:HttpClient) { 
    super()
  }

  add(object: ParentInterface): Observable<InterfaceParamsResponse<ParentInterface>> | Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }
  upd(spId: number, object: ServicesProvided): Observable<InterfaceParamsResponse<ServicesProvided>> {
    return this.https.put<InterfaceParamsResponse<ServicesProvided>>(`${this.API_SERVICES_PROVIDED}/${spId}`, object)    
  }
  public del(prdsId: number): Observable<InterfaceParamsResponse<ServicesProvided>> {
    return this.https.delete<InterfaceParamsResponse<ServicesProvided>>(`${this.API_SERVICES_PROVIDED}/${prdsId}`)
  }

  public dels(ids: number[]): Observable<InterfaceParamsResponse<ServicesProvided>> {
    return this.https.delete<InterfaceParamsResponse<ServicesProvided>>(`${this.API_SERVICES_PROVIDED}/${ids}`);
  }
 
  all(): Observable<InterfaceParamsResponse<ParentInterface>> | Observable<ParentInterface[]> | null {
    throw new Error('Method not implemented.');
  }
  find(id: string | number): Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }
  allByDBP(dbpId:number):Observable<InterfaceParamsResponse<ServicesProvided>>{
    return this.https.get<InterfaceParamsResponse<ServicesProvided>>(`${this.API_SERVICES_PROVIDED}/all-by-dbp?dbpId=${dbpId}`);
  }

  addServicesProvided(object: ServicesProvided):Observable<InterfaceParamsResponse<ServicesProvided>>{
    return this.https.post<InterfaceParamsResponse<ServicesProvided>>(`${this.API_SERVICES_PROVIDED}/addServicesProvided`, object);
  }

  getPayments(spId:number):Observable<InterfaceParamsResponse<ServicesProvided>>{
    return this.https.get<InterfaceParamsResponse<ServicesProvided>>(`${this.API_SERVICES_PROVIDED}/${spId}/payments`)
  }
}
