import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudApiInterface } from '../global/interfaces/crud-api.interface';
import { ParentInterface, InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends ParentService implements CrudApiInterface{
  private API_EXIST_DNI = `${this.HOST_API}/api/v1/person/exist-dni`

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

  existDni(perNumberDoc:string):Observable<Person>{
    return this.https.post<Person>(`${this.API_EXIST_DNI}`,{perNumberDoc} )
  }
}
