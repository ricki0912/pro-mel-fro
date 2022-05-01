import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import {CounterCard} from '../interfaces/dashboard';
@Injectable({
  providedIn: 'root'
})
export class DashboardService extends ParentService{


  private API_DASHBOARD = `${this.HOST_API}/api/v1/dashboard`
  constructor(private https: HttpClient
    ) {
    super()
  }
  public getCounterCards(hqId:number): Observable<InterfaceParamsResponse<CounterCard>> {
    return this.https.get<InterfaceParamsResponse<CounterCard>>(`${this.API_DASHBOARD}/counter-cards?hqId=${hqId}`);
  }
}
