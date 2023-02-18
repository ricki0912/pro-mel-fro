import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse, ParentInterface } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { DoneByMonth } from '../interfaces/done-by-month';
import { Role } from '../interfaces/role';
import { TASK_KIND_DECL, TASK_STATES } from '../interfaces/task';
import { Teller } from '../interfaces/teller';

@Injectable({
  providedIn: 'root'
})
export class DoneByMonthService extends ParentService {
  private API_DONE_BY_MONTH = `${this.HOST_API}/api/v1/done-by-months`
  
  constructor(private https: HttpClient) {
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


  findByBusiness(p:{bussId:number,prdsId:number,dbmMonth:number,tsksKindDecl:number } ): Observable<InterfaceParamsResponse<any>> {
    return this.https.get<InterfaceParamsResponse<any>>(`${this.API_DONE_BY_MONTH}/find-by-business`, {params: p});
  }

  addUpd(dbm:DoneByMonth):Observable<InterfaceParamsResponse<DoneByMonth>>{
    return this.https.post<InterfaceParamsResponse<DoneByMonth>>(`${this.API_DONE_BY_MONTH}/add-upd`, dbm);

  }

  allByDBussPeriod(p:{dbpId:number} ): Observable<InterfaceParamsResponse<any>> {
    return this.https.get<InterfaceParamsResponse<any>>(`${this.API_DONE_BY_MONTH}/all-by-d-buss-period`, {params: p});
  }


  /*
  find(id: string | number): Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }

  addCards(object: Cards):Observable<InterfaceParamsResponse<Cards>>{
    return this.https.post<InterfaceParamsResponse<Cards>>(`${this.API_ADD_CARDS}`, object);
  }

  public updCards(object: Cards): Observable<InterfaceParamsResponse<ParentInterface>> {
    return this.https.put<InterfaceParamsResponse<Cards>>(`${this.API_UPD_CARDS}`, object);
  }

  public delCards(id: number[]): Observable<InterfaceParamsResponse<Cards>> {
    return this.https.delete<InterfaceParamsResponse<Cards>>(`${this.API_DEL_CARDS}/${id}`);
  }

  public enableDisableCards(id: number[]): Observable<InterfaceParamsResponse<Cards>> {
    return this.https.delete<InterfaceParamsResponse<Cards>>(`${this.API_STATE_CARDS}/${id}`);
  }*/

  
}
