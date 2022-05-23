import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { Period } from '../interfaces/period';

@Injectable({
  providedIn: 'root'
})
export class PeriodService extends ParentService {

  private API_PERIOD = `${this.HOST_API}/api/v1/periods`
  constructor(private https: HttpClient) {
    super()
  }

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

}
