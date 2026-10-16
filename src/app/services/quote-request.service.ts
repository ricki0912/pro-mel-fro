import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { DebtsAndPaids } from '../interfaces/debts-and-paids';
import { LastPayment } from '../interfaces/last-payment';
import { Payment } from '../interfaces/payment';
import { QuoteRequest } from '../interfaces/quote-request';


@Injectable({
  providedIn: 'root'
})
export class QuoteRequestService extends ParentService {



  private API_QUOTE_REQUEST = `${this.HOST_API}/api/v1/quote-requests`
  constructor(private https: HttpClient) {
    super()
  }

  public all(quoteAssignedToTellId:number, quoteReqState:number,quoteReqRegDateStart:Date, quoteReqRegDateEnd:Date,q:string): Observable<InterfaceParamsResponse<QuoteRequest>> {
    return this.https.get<InterfaceParamsResponse<QuoteRequest>>(`${this.API_QUOTE_REQUEST}` ,{params:{quoteAssignedToTellId,quoteReqState,quoteReqRegDateStart:quoteReqRegDateStart.toISOString(),quoteReqRegDateEnd:quoteReqRegDateEnd.toISOString(),q}});
  }

  public getCountByState(quoteReqState:number): Observable<InterfaceParamsResponse<number>> {
    return this.https.get<InterfaceParamsResponse<number>>(`${this.API_QUOTE_REQUEST}/count-by-state` ,{params:{quoteReqState}});
  }

  //Route::put('/v1/quote-requests/{id}', [QuoteRequestController::class, 'update'])->middleware(['auth:sanctum']);
  public update(quoteReqId:number, quoteRequest: QuoteRequest): Observable<InterfaceParamsResponse<QuoteRequest>> {
    return this.https.put<InterfaceParamsResponse<QuoteRequest>>(`${this.API_QUOTE_REQUEST}/${quoteReqId}` ,quoteRequest);
  }

  


  /*public getLastPaymentByClient(tellId:number){
    return this.https.get<InterfaceParamsResponse<LastPayment>>(`${this.API_QUOTE_REQUEST}/last-payment-by-client` ,{params:{tellId}});

  }

  public getOldDebtByClient(tellId:number){
    return this.https.get<InterfaceParamsResponse<LastPayment>>(`${this.API_QUOTE_REQUEST}/old-debt-by-client` ,{params:{tellId}});

  }*/

  

}
