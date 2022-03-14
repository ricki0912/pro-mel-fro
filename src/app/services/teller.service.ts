import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable , throwError} from 'rxjs';
import {Teller} from '../interfaces/teller';


import { catchError, retry } from 'rxjs/operators';
import { ParentService } from '../global/parents/parent.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ParentInterface, InterfaceParamsResponse } from '../global/parents/parent.interface';


@Injectable({
  providedIn: 'root'
})

export class TellerService extends ParentService {

  private API_ALL=`${this.HOST_API}/api/v1/tellers`
  private API_ADD=`${this.HOST_API}/api/v1/tellers`
  private API_UPD=`${this.HOST_API}/api/v1/tellers`
  private API_DEL=`${this.HOST_API}/api/v1/tellers`
  private API_FIND=`${this.HOST_API}/api/v1/tellers`
  private API_SEARCH_BY_CODE=`${this.HOST_API}/api/v1/tellers/search-by-code`
  constructor(private https: HttpClient){
    super()
  } 

  public all(): Observable<Teller[]>  {
      return this.https.get<Teller[]>(this.API_ALL);
  }


  add(object: Teller):Observable<InterfaceParamsResponse<Teller>>{
    return this.https.post<InterfaceParamsResponse<Teller>>(`${this.API_ADD}`, object);
  }

  public del(id: number): Observable<InterfaceParamsResponse<Teller>> {
      return this.https.delete<InterfaceParamsResponse<Teller>>(`${this.API_ADD}/${id}`)
  }

  public upd(object: Teller): Observable<InterfaceParamsResponse<ParentInterface>>{
      return this.https.put<InterfaceParamsResponse<Teller>>(`${this.API_UPD}`, object);
      
  }

  public find(id: number): Observable<Teller>{  
    return this.https.get<Teller>(`${this.API_FIND}/${id}`)
  }

  public searchByCode(code: string):Observable<Teller> {
    return this.https.get<Teller>(`${this.API_SEARCH_BY_CODE}/${code}`)
  }


}
