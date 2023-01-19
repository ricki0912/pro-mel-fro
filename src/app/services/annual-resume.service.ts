import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { AnnualResume } from '../interfaces/annual-resume';
import { Period } from '../interfaces/period';

@Injectable({
  providedIn: 'root'
})
export class AnnualResumeService extends ParentService {

  private API_ANNUAL_RESUME = `${this.HOST_API}/api/v1/annual-resume`
  constructor(private https: HttpClient) {
    super()
  }

  /*public all(prdsState:number=0): Observable<InterfaceParamsResponse<Period>> {
    return this.https.get<InterfaceParamsResponse<Period>>(`${this.API_PERIOD}?prdsState=${prdsState}` );
  }*/


  public findBy(bussId:number, prdsId:number): Observable<InterfaceParamsResponse<AnnualResume>> {
    return this.https.get<InterfaceParamsResponse<AnnualResume>>(`${this.API_ANNUAL_RESUME}/find-by`, {params: {bussId, prdsId}});
  }

  public createUpdate(object: AnnualResume): Observable<InterfaceParamsResponse<Period>> {
    return this.https.post<InterfaceParamsResponse<Period>>(`${this.API_ANNUAL_RESUME}/create-update`, object);

  }
  /*
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
