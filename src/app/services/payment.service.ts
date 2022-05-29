import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { Payment } from '../interfaces/payment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService extends ParentService {



  private API_PAYMENT = `${this.HOST_API}/api/v1/payments`
  constructor(private https: HttpClient) {
    super()
  }

  public all(prdsState:number=0): Observable<InterfaceParamsResponse<Payment>> {
    return this.https.get<InterfaceParamsResponse<Payment>>(`${this.API_PAYMENT}?prdsState=${prdsState}` );
  }

  public allByHQ(hqId: number) {
    return this.https.get<Payment[]>(`${this.API_PAYMENT}/all-by-hq?hqId=${hqId}`);
  }
/*
  public add(object: Payment): Observable<InterfaceParamsResponse<Payment>> {
    return this.https.post<InterfaceParamsResponse<Payment>>(`${this.API_PAYMENT}`, object);
  }*/
  public add(object: Payment):any{
    return this.https.post(`${this.API_PAYMENT}`, object, {
      responseType: 'blob', observe: 'response'
    });
  }

  public del(prdsId: number): Observable<InterfaceParamsResponse<Payment>> {
    return this.https.delete<InterfaceParamsResponse<Payment>>(`${this.API_PAYMENT}/${prdsId}`)
  }

  public dels(ids: number[]): Observable<InterfaceParamsResponse<Payment>> {
    return this.https.delete<InterfaceParamsResponse<Payment>>(`${this.API_PAYMENT}/${ids}`);
  }

  public upd(object: Payment, prdsId:number): Observable<InterfaceParamsResponse<Payment>> {
    return this.https.put<InterfaceParamsResponse<Payment>>(`${this.API_PAYMENT}/${prdsId}`, object);

  }


}
