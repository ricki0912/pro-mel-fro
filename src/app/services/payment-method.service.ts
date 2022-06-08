import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaymentMethod} from 'src/app/interfaces/payment-method'
@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService extends ParentService{

  private API_PAYMENT_METHOD = `${this.HOST_API}/api/v1/payment-methods`
  constructor(private https: HttpClient) {
    super()
  }

  public all(paymthdsState:number=0): Observable<InterfaceParamsResponse<PaymentMethod>> {
    return this.https.get<InterfaceParamsResponse<PaymentMethod>>(`${this.API_PAYMENT_METHOD}?paymthdsState=${paymthdsState}` );
  }

  public allByHQ(hqId: number) {
    return this.https.get<PaymentMethod[]>(`${this.API_PAYMENT_METHOD}/all-by-hq?hqId=${hqId}`);
  }

  public add(object: PaymentMethod): Observable<InterfaceParamsResponse<PaymentMethod>> {
    return this.https.post<InterfaceParamsResponse<PaymentMethod>>(`${this.API_PAYMENT_METHOD}`, object);
  }

  public del(paymthdsId: number): Observable<InterfaceParamsResponse<PaymentMethod>> {
    return this.https.delete<InterfaceParamsResponse<PaymentMethod>>(`${this.API_PAYMENT_METHOD}/${paymthdsId}`)
  }

  public dels(ids: number[]): Observable<InterfaceParamsResponse<PaymentMethod>> {
    return this.https.delete<InterfaceParamsResponse<PaymentMethod>>(`${this.API_PAYMENT_METHOD}/${ids}`);
  }

  public upd(object: PaymentMethod, paymthdsId:number): Observable<InterfaceParamsResponse<PaymentMethod>> {
    return this.https.put<InterfaceParamsResponse<PaymentMethod>>(`${this.API_PAYMENT_METHOD}/${paymthdsId}`, object);

  }

  public changeState(paymthdsId: number, paymthdsState:number): Observable<InterfaceParamsResponse<PaymentMethod>> {
    return this.https.put<InterfaceParamsResponse<PaymentMethod>>(`${this.API_PAYMENT_METHOD}/${paymthdsId}/change-state`, {paymthdsState});
  }
}
