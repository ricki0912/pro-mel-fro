import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParentService } from '../global/parents/parent.service';
import { PeriodPayment } from '../interfaces/period-payment';

@Injectable({
  providedIn: 'root'
})
export class PeriodPaymentService extends ParentService {
  private API_PERIOD_PAYMENT = `${this.HOST_API}/api/v1/period-payments`;
  constructor(private https:HttpClient) {
    super()
  }

  all(): Observable<PeriodPayment[]> {
    return this.https.get<PeriodPayment[]>(this.API_PERIOD_PAYMENT);
  }
}
