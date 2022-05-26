import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudApiInterface } from '../global/interfaces/crud-api.interface';
import { ParentInterface, InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';

@Injectable({
  providedIn: 'root'
})
export class DBusinessPeriodService extends ParentService implements CrudApiInterface {

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
  all(): Observable<InterfaceParamsResponse<ParentInterface>> | Observable<ParentInterface[]> | null {
    throw new Error('Method not implemented.');
  }
  find(id: string | number): Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }
}
