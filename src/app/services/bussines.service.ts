import { Injectable } from '@angular/core';

import { ParentService } from '../global/parents/parent.service';
import { HttpClient } from '@angular/common/http';
import { CrudApiInterface } from '../global/interfaces/crud-api.interface';
import { Observable } from 'rxjs';
import { ParentInterface, InterfaceParamsResponse } from '../global/parents/parent.interface';
import { Bussines } from '../interfaces/bussines';

@Injectable({
  providedIn: 'root'
})
export class BussinesService extends ParentService implements CrudApiInterface{
  private API_ALL = `${this.HOST_API}/api/v1/bussines`
  private API_EXIST_RUC = `${this.HOST_API}/api/v1/business/exist-ruc`

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
  all(): Observable<InterfaceParamsResponse<Bussines>> {
    return this.https.get<InterfaceParamsResponse<Bussines>>(this.API_ALL);
  }
  find(id: string | number): Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }

  existRuc(bussRUC:string):Observable<Bussines>{
    return this.https.post<Bussines>(`${this.API_EXIST_RUC}`,{bussRUC} )
  }
}
