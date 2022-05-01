import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable , throwError} from 'rxjs';
import {Teller, TTellerJoinPerson} from '../interfaces/teller';


import { catchError, retry } from 'rxjs/operators';
import { ParentService } from '../global/parents/parent.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ParentInterface, InterfaceParamsResponse } from '../global/parents/parent.interface';
import { User } from '../auth/interfaces/user';
import { Category } from '../interfaces/category';


@Injectable({
  providedIn: 'root'
}) 

export class TellerService extends ParentService {

  //private API_ALL=`${this.HOST_API}/api/v1/tellers`
  //private API_ADD=`${this.HOST_API}/api/v1/tellers`
  //private API_UPD=`${this.HOST_API}/api/v1/tellers`
  //private API_DEL=`${this.HOST_API}/api/v1/tellers`
  //private API_FIND=`${this.HOST_API}/api/v1/tellers`
  //private API_SEARCH_BY_CODE=`${this.HOST_API}/api/v1/tellers/search-by-code`
  //private API_UPD_USER=`${this.HOST_API}/api/v1/tellers`
  private API_TELLER=`${this.HOST_API}/api/v1/tellers`
  constructor(private https: HttpClient){
    super()
  } 

  public all(): Observable<Teller[]>  {
      return this.https.get<Teller[]>(this.API_TELLER);
  }

  public allByHQ(hqId:number){
    return this.https.get<Teller[]>(`${this.API_TELLER}/all-by-hq?hqId=${hqId}`);
  }

  public add(object: Teller):Observable<InterfaceParamsResponse<Teller>>{
    return this.https.post<InterfaceParamsResponse<Teller>>(`${this.API_TELLER}`, object);
  }

  public del(id: number): Observable<InterfaceParamsResponse<Teller>> {
      return this.https.delete<InterfaceParamsResponse<Teller>>(`${this.API_TELLER}/${id}`)
  }

  public upd(object: Teller): Observable<InterfaceParamsResponse<ParentInterface>>{
      return this.https.put<InterfaceParamsResponse<Teller>>(`${this.API_TELLER}`, object);
      
  }

  public find(id: number): Observable<Teller>{  
    return this.https.get<Teller>(`${this.API_TELLER}/${id}`)
  }

  public searchByCode(code: string):Observable<Teller> {
    return this.https.get<Teller>(`${this.API_TELLER}/search-by-code/${code}`)
  }
  public updState(id:number, tellState:number):Observable<InterfaceParamsResponse<Teller>>{
    return this.https.put<InterfaceParamsResponse<Teller>>(`${this.API_TELLER}/${id}/upd-state`, {tellState});
  }

  /*usuario  */
  public updUser(id:number, userId:number):Observable<InterfaceParamsResponse<Teller>>{
    return this.https.put<InterfaceParamsResponse<Teller>>(`${this.API_TELLER}/${id}/upd-user`, {userId});
  }
  /*many to many with table categories */
  public getCategories(id:number):Observable<InterfaceParamsResponse<Category>>{
    return this.https.get<InterfaceParamsResponse<Category>>(`${this.API_TELLER}/${id}/get-categories`);
  }

  public attachCategory(id:number, catId:number):Observable<InterfaceParamsResponse<Category>>{
    return this.https.put<InterfaceParamsResponse<Category>>(`${this.API_TELLER}/${id}/attach-category`,{catId});
  }

  public detachCategory(id:number, catId:number):Observable<InterfaceParamsResponse<Category>>{
    return this.https.delete<InterfaceParamsResponse<Category>>(`${this.API_TELLER}/${id}/detach-category/${catId}`);
  }

  /*join */
  /*public getJoinPerson():Observable<InterfaceParamsResponse<TTellerJoinPerson>>{
    return this.https.get<InterfaceParamsResponse<TTellerJoinPerson>>(`${this.API_TELLER}/get-join-person`);
  }*/
  public getJoinPersonByHQ(hqId:number):Observable<InterfaceParamsResponse<TTellerJoinPerson>>{
    return this.https.get<InterfaceParamsResponse<TTellerJoinPerson>>(`${this.API_TELLER}/get-join-person-by-hq?hqId=${hqId}`);
  }
/*
  public getJoinPersonByUser(id:number):Observable<InterfaceParamsResponse<TTellerJoinPerson>>{
    return this.https.get<InterfaceParamsResponse<TTellerJoinPerson>>(`${this.API_TELLER}/get-join-person`);
  }*/

}
