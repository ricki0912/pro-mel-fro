import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { AppointmentTemp } from '../interfaces/appointment-temp';

@Injectable({
  providedIn: 'root'
})
export class AppointmentTempService extends ParentService {
  private API_APPOINTMENT_TEMP=`${this.HOST_API}/api/v1/appointment-temps`
  constructor(private https:HttpClient) { 
    super()
  }

  public all(): Observable<InterfaceParamsResponse<AppointmentTemp>>  {
    return this.https.get<InterfaceParamsResponse<AppointmentTemp>>(this.API_APPOINTMENT_TEMP);
  }


  public add(object: AppointmentTemp):Observable<InterfaceParamsResponse<AppointmentTemp>>{
    return this.https.post<InterfaceParamsResponse<AppointmentTemp>>(`${this.API_APPOINTMENT_TEMP}`, object);
  }

  
}
