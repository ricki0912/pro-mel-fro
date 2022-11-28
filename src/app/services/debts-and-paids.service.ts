import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { DebtsAndPaids } from '../interfaces/debts-and-paids';
import { LastPayment } from '../interfaces/last-payment';
import { Payment } from '../interfaces/payment';


@Injectable({
  providedIn: 'root'
})
export class DebtsAndPaidsService extends ParentService {



  private API_DEBTS_AND_PAIDS = `${this.HOST_API}/api/v1/debts-and-paids`
  constructor(private https: HttpClient) {
    super()
  }

  public all(tellId:number,bussState:number,prdsId:number,svId:number, ppayId:number,q:string): Observable<InterfaceParamsResponse<DebtsAndPaids>> {
    return this.https.get<InterfaceParamsResponse<DebtsAndPaids>>(`${this.API_DEBTS_AND_PAIDS}` ,{params:{tellId,bussState,prdsId,svId, ppayId,q}});
  }

  public getLastPaymentByClient(tellId:number){
    return this.https.get<InterfaceParamsResponse<LastPayment>>(`${this.API_DEBTS_AND_PAIDS}/last-payment-by-client` ,{params:{tellId}});

  }

  public getOldDebtByClient(tellId:number){
    return this.https.get<InterfaceParamsResponse<LastPayment>>(`${this.API_DEBTS_AND_PAIDS}/old-debt-by-client` ,{params:{tellId}});

  }

  

}
