import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { AppointmentTemp, TAppointmentTemp } from '../interfaces/appointment-temp';

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

  public getAllBy(tellId:number, catId:number, apptmState:number): Observable<InterfaceParamsResponse<TAppointmentTemp>>  {
    return this.https.get<InterfaceParamsResponse<TAppointmentTemp>>(`${this.API_APPOINTMENT_TEMP}/get-all-by?tellId=${tellId}&catId=${catId}&apptmState=${apptmState}`);
  }

  public updateTeller(apptmIds:number[], tellId:number):Observable<InterfaceParamsResponse<TAppointmentTemp>>{
    console.log(`${this.API_APPOINTMENT_TEMP}/${apptmIds}/teller/`);
    return this.https.put<InterfaceParamsResponse<TAppointmentTemp>>(`${this.API_APPOINTMENT_TEMP}/${apptmIds}/teller/`,{tellId})
  }
  
  public startCallByTeller(tellId:number, apptmId?:number): Observable<InterfaceParamsResponse<TAppointmentTemp>>{
    return this.https.put<InterfaceParamsResponse<TAppointmentTemp>>(`${this.API_APPOINTMENT_TEMP}/start-call-by-teller/`, {tellId, apptmId})

  }

  public undoCall(apptmId:number): Observable<InterfaceParamsResponse<TAppointmentTemp>>{
    return this.https.put<InterfaceParamsResponse<TAppointmentTemp>>(`${this.API_APPOINTMENT_TEMP}/${apptmId}/undo-call/`, {})
  }

  public callAgain(apptmId:number): Observable<InterfaceParamsResponse<TAppointmentTemp>>{
    return this.https.put<InterfaceParamsResponse<TAppointmentTemp>>(`${this.API_APPOINTMENT_TEMP}/${apptmId}/call-again/`, {})
  }

  public finalizeCall(apptmId:number, appointmentTemp:AppointmentTemp): Observable<InterfaceParamsResponse<TAppointmentTemp>>{
    return this.https.put<InterfaceParamsResponse<TAppointmentTemp>>(`${this.API_APPOINTMENT_TEMP}/${apptmId}/finalize-call/`, appointmentTemp)
  }

  public transferCallToTeller(apptmId:number, tellId:number): Observable<InterfaceParamsResponse<TAppointmentTemp>>{
    return this.https.put<InterfaceParamsResponse<TAppointmentTemp>>(`${this.API_APPOINTMENT_TEMP}/${apptmId}/transfer-call-to-teller/`, {tellId})
  }

  public getAttentionPendingByTeller( tellId:number): Observable<InterfaceParamsResponse<TAppointmentTemp>>{
    return this.https.get<InterfaceParamsResponse<TAppointmentTemp>>(`${this.API_APPOINTMENT_TEMP}/get-attention-pending-by-teller/${tellId}`,)
  }

  public getAttentionNoPending(limit:number=0): Observable<InterfaceParamsResponse<TAppointmentTemp>>{
    return this.https.get<InterfaceParamsResponse<TAppointmentTemp>>(`${this.API_APPOINTMENT_TEMP}/get-attention-no-pending?limit=${limit}`)
  }

  public getNroTotal(apptmState:number, tellId:number): Observable<InterfaceParamsResponse<TAppointmentTemp>>{
    return this.https.get<InterfaceParamsResponse<TAppointmentTemp>>(`${this.API_APPOINTMENT_TEMP}/get-nro-total?apptmState=${apptmState}&tellId=${tellId}`)
  }
}
  
  
