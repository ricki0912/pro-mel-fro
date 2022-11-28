import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudApiInterface } from '../global/interfaces/crud-api.interface';
import { ParentInterface, InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { Services } from '../interfaces/services';

@Injectable({
  providedIn: 'root'
})
export class ServicesService extends ParentService implements CrudApiInterface{

  private API_SERVICES = `${this.HOST_API}/api/v1/services`

  constructor(private https:HttpClient) {
    super()
  }

  add(object: ParentInterface): Observable<InterfaceParamsResponse<ParentInterface>> | Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }
  upd(id: string | number, object: ParentInterface): Observable<InterfaceParamsResponse<ParentInterface>> | Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }
  del(id: string | number): Observable<InterfaceParamsResponse<ParentInterface>> | null {
    throw new Error('Method not implemented.');
  }
  all(): Observable<Services[]> | null {
    return this.https.get<Services[]>(this.API_SERVICES);
  }
  find(id: string | number): Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }

  addServices(object: Services):Observable<InterfaceParamsResponse<Services>>{
    return this.https.post<InterfaceParamsResponse<Services>>(`${this.API_SERVICES}/addServices`, object);
  }

  updServices(object: Services):Observable<InterfaceParamsResponse<Services>>{
    return this.https.put<InterfaceParamsResponse<Services>>(`${this.API_SERVICES}/updServices`, object);
  }

  public delServices(id: number[]): Observable<InterfaceParamsResponse<Services>> {
    return this.https.delete<InterfaceParamsResponse<Services>>(`${this.API_SERVICES}/delServices/${id}`);
  }

  public enableDisableServices(id: number[]): Observable<InterfaceParamsResponse<Services>> {
    return this.https.delete<InterfaceParamsResponse<Services>>(`${this.API_SERVICES}/stateServices/${id}`);
  }

  public reOrder(id: number[]): Observable<InterfaceParamsResponse<Services>> {
    return this.https.put<InterfaceParamsResponse<Services>>(`${this.API_SERVICES}/${id}/re-order`,{});
  }
}
