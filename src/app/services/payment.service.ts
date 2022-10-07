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

  public proofOfPaymentJson(payToken:string):Observable<InterfaceParamsResponse<any>>{
    return this.https.get<InterfaceParamsResponse<any>>(`${this.API_PAYMENT}/${payToken}/proof-of-payment-json`)
  }

  public all(bussId:number=0, hqId=0, dateStart:string='', dateEnd:string='', wordLike:string=''): Observable<InterfaceParamsResponse<Payment>> {
    return this.https.get<InterfaceParamsResponse<Payment>>(`${this.API_PAYMENT}` ,{params:{bussId,hqId, dateStart,dateEnd,wordLike}});
  }


  public allByBuss(bussId:number=0): Observable<InterfaceParamsResponse<Payment>> {
    return this.https.get<InterfaceParamsResponse<Payment>>(`${this.API_PAYMENT}/all-by-buss?bussId=${bussId}` );
  }

  public allByHQ(hqId: number) {
    return this.https.get<Payment[]>(`${this.API_PAYMENT}/all-by-hq?hqId=${hqId}`);
  }

  public add(object: Payment): Observable<InterfaceParamsResponse<Payment>> {
    return this.https.post<InterfaceParamsResponse<Payment>>(`${this.API_PAYMENT}`, object);
  }

  public cancel(payId:number, object: Payment): Observable<InterfaceParamsResponse<Payment>> {
    return this.https.put<InterfaceParamsResponse<Payment>>(`${this.API_PAYMENT}/${payId}/cancel`, object);
  }

  public setTicket(payId:number, object: Payment): Observable<InterfaceParamsResponse<Payment>> {
    return this.https.put<InterfaceParamsResponse<Payment>>(`${this.API_PAYMENT}/${payId}/ticket`, object);
  }

  public setInvoice(payId:number, object: Payment): Observable<InterfaceParamsResponse<Payment>> {
    return this.https.put<InterfaceParamsResponse<Payment>>(`${this.API_PAYMENT}/${payId}/invoice`, object);
  }

  public setReceiptHonorary(payId:number, object: Payment): Observable<InterfaceParamsResponse<Payment>> {
    return this.https.put<InterfaceParamsResponse<Payment>>(`${this.API_PAYMENT}/${payId}/receipt-honorary`, object);
  }


  
  /*public proofPDF(object: Payment):any{
    return this.https.post(`${this.API_PAYMENT}`, object, {
      responseType: 'blob', observe: 'response'
    });
  }*/

  public getProofPDF(payToken:string):any{
    return this.https.get(`${this.API_PAYMENT}/${payToken}/proof-of-payment`, {
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
