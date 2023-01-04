import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
@Injectable({
  providedIn: 'root'
})
export class ReportsService extends ParentService{


  private API_REPORTS = `${this.HOST_API}/api/v1/reports`
  constructor(private https: HttpClient
    ) {
    super()
  }

  public getAllBussinesAndVisitorsByDate(): Observable<InterfaceParamsResponse<any>> {
    return this.https.get<InterfaceParamsResponse<any>>(`${this.API_REPORTS}/get-all-bussines-and-visitors-by-date`);
  }

  public getPaymentsMethodsByTeller(dateStart:string, dateEnd:string): Observable<InterfaceParamsResponse<any>> {
    return this.https.get<InterfaceParamsResponse<any>>(`${this.API_REPORTS}/get-payments-methods-by-teller`);
  }
 
}
