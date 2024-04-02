import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { DBusinessPeriod } from '../interfaces/d-business-period';
import { Period } from '../interfaces/period';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StatementService extends ParentService {

  private API_STATEMENTS = `${this.HOST_API}/api/v1/statements`
  constructor(private https: HttpClient) {
    super()
  }

  
  public statementsByMonths(p:{prdsId:number,dbmMonth:number, ln:number}): Observable<InterfaceParamsResponse<any/*{dBusinessesPeriod:DBusinessPeriod[], users:User[]}*/>> {
    return this.https.get<InterfaceParamsResponse<any/*{dBusinessesPeriod:DBusinessPeriod[], users:User[]}*/>>(`${this.API_STATEMENTS}/statements-by-month`, {params: p} );
  }

  public summary(){

  }

  public pendingsAndObserveds(p:{tellId:number, prdsId:number,dbmMonth:number, ln:number}): Observable<InterfaceParamsResponse<any/*{dBusinessesPeriod:DBusinessPeriod[], users:User[]}*/>> {
    return this.https.get<InterfaceParamsResponse<any/*{dBusinessesPeriod:DBusinessPeriod[], users:User[]}*/>>(`${this.API_STATEMENTS}/pendings-and-observeds`, {params: p} );
  }



/*
  public all(prdsState:number=0): Observable<InterfaceParamsResponse<Period>> {
    console.log("**ID PRDSSTATE**",prdsState)
    return this.https.get<InterfaceParamsResponse<Period>>(`${this.API_PERIOD}?prdsState=${prdsState}` );
  }

  public allByHQ(hqId: number) {
    return this.https.get<Period[]>(`${this.API_PERIOD}/all-by-hq?hqId=${hqId}`);
  }

  public add(object: Period): Observable<InterfaceParamsResponse<Period>> {
    return this.https.post<InterfaceParamsResponse<Period>>(`${this.API_PERIOD}`, object);
  }

  public del(prdsId: number): Observable<InterfaceParamsResponse<Period>> {
    return this.https.delete<InterfaceParamsResponse<Period>>(`${this.API_PERIOD}/${prdsId}`)
  }

  public dels(ids: number[]): Observable<InterfaceParamsResponse<Period>> {
    return this.https.delete<InterfaceParamsResponse<Period>>(`${this.API_PERIOD}/${ids}`);
  }

  public upd(object: Period, prdsId:number): Observable<InterfaceParamsResponse<Period>> {
    return this.https.put<InterfaceParamsResponse<Period>>(`${this.API_PERIOD}/${prdsId}`, object);

  }

  public changeState(prdsId: number, prdsState:number): Observable<InterfaceParamsResponse<Period>> {
    return this.https.put<InterfaceParamsResponse<Period>>(`${this.API_PERIOD}/${prdsId}/change-state`, {prdsState});
  }
*/
}
