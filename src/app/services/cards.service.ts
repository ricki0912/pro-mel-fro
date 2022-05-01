import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudApiInterface } from '../global/interfaces/crud-api.interface';
import { ParentInterface, InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { Cards } from '../interfaces/cards';

@Injectable({
  providedIn: 'root'
})

export class CardsService extends ParentService implements CrudApiInterface {
  private API_CARDS=`${this.HOST_API}/api/v1/cards`
  private API_ADD_CARDS = `${this.HOST_API}/api/v1/cards/add-cards`
  private API_UPD_CARDS = `${this.HOST_API}/api/v1/cards/upd_cards`
  private API_DEL_CARDS = `${this.HOST_API}/api/v1/cards`
  private API_STATE_CARDS = `${this.HOST_API}/api/v1/cards/stateCards`

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
  all(): Observable<Cards[]> {
    return this.https.get<Cards[]>(this.API_CARDS);
  }
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
  }
}
