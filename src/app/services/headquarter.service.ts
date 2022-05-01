import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { Headquarter } from '../interfaces/headquarter';

@Injectable({
  providedIn: 'root'
})
export class HeadquarterService extends ParentService {
  private API_HEADQUARTER = `${this.HOST_API}/api/v1/headquarters`
  constructor(private https: HttpClient) {
    super()
  }

  public all(): Observable<InterfaceParamsResponse<Headquarter>> {
    return this.https.get<InterfaceParamsResponse<Headquarter>>(this.API_HEADQUARTER);
  }


  public add(object: Headquarter): Observable<InterfaceParamsResponse<Headquarter>> {
    return this.https.post<InterfaceParamsResponse<Headquarter>>(`${this.API_HEADQUARTER}`, object);
  }

  public del(id: number): Observable<InterfaceParamsResponse<Headquarter>> {
    return this.https.delete<InterfaceParamsResponse<Headquarter>>(`${this.API_HEADQUARTER}/${id}`)
  }

  public upd(object: Headquarter): Observable<InterfaceParamsResponse<Headquarter>> {
    return this.https.put<InterfaceParamsResponse<Headquarter>>(`${this.API_HEADQUARTER}/${object.hqId}}`, object);

  }

  public find(id: number): Observable<Headquarter> {
    return this.https.get<Headquarter>(`${this.API_HEADQUARTER}/${id}`)
  }
  
  public searchByName(name: string):Observable<Headquarter> {
    return this.https.get<Headquarter>(`${this.API_HEADQUARTER}/search-by-name/${name}`)
  }
}
