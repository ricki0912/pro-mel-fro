import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { Appointment } from '../interfaces/appointment';
import { Category } from '../interfaces/category';
import { Teller } from '../interfaces/teller';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends ParentService {
  private API_APPOINTMENT=`${this.HOST_API}/api/v1/appointments`
  constructor(private https:HttpClient) { 
    super()
  }

  public find(apptmId:number):Observable<InterfaceParamsResponse<Appointment>>{
    return this.https.get<InterfaceParamsResponse<Appointment>>(`${this.API_APPOINTMENT}/${apptmId}`);
  }

  public getAllBy(hqId:number,tellId:number, catId:number, apptmState:number, dateStart:string, dateEnd:string, bussId:number, limit:number ): Observable<InterfaceParamsResponse<Appointment>>  {
    return this.https.get<InterfaceParamsResponse<Appointment>>(`${this.API_APPOINTMENT}/get-all-by`,{params:{hqId,tellId,catId,apptmState,dateStart,dateEnd,bussId, limit}});
  }

  public getTellers(hqId:number): Observable<InterfaceParamsResponse<Teller>>  {
      return this.https.get<InterfaceParamsResponse<Teller>>(`${this.API_APPOINTMENT}/get-tellers?hqId=${hqId}`);
  }

  public getCategories(hqId:number): Observable<InterfaceParamsResponse<Category>>  {
    return this.https.get<InterfaceParamsResponse<Category>>(`${this.API_APPOINTMENT}/get-categories?hqId=${hqId}`);
  }

}
