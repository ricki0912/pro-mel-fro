import { Injectable } from '@angular/core';

import { ParentService } from '../global/parents/parent.service';
import { HttpClient } from '@angular/common/http';
import { CrudApiInterface } from '../global/interfaces/crud-api.interface';
import { Observable } from 'rxjs';
import { ParentInterface, InterfaceParamsResponse } from '../global/parents/parent.interface';
import { Bussines, TellerJoinUsers } from '../interfaces/bussines';
import { DBusinessPeriod } from '../interfaces/d-business-period';
import { Period } from '../interfaces/period';

@Injectable({
  providedIn: 'root'
})
export class BussinesService extends ParentService implements CrudApiInterface{
  private API_ALL = `${this.HOST_API}/api/v1/bussines`
  private API_DEL = `${this.HOST_API}/api/v1/business`

  private API_EXIST_RUC = `${this.HOST_API}/api/v1/business/exist-ruc`
  private API_EXIST_FILE_NUMBER = `${this.HOST_API}/api/v1/business/exist-fileNumber`
  private API_ADD_BUSINESS_WHIT_PERSON = `${this.HOST_API}/api/v1/business/add-business-with-person`
  private API_BUSSINES=`${this.HOST_API}/api/v1/business`
  private API_DBUSINES_PERIODS = `${this.HOST_API}/api/v1/d-business-periods`

  constructor(private https:HttpClient) {
    super()
  }

  add(object: ParentInterface): Observable<InterfaceParamsResponse<ParentInterface>> | Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }
  upd(id: string | number, object: ParentInterface): Observable<InterfaceParamsResponse<ParentInterface>> | Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }
  del(id: number): Observable<InterfaceParamsResponse<ParentInterface>> | null {
    return this.https.delete<InterfaceParamsResponse<Bussines>>(`${this.API_DEL}/${id}`);

  }
  all(): Observable<Bussines[]> | null {
    return this.https.get<Bussines[]>(this.API_ALL);
  }
  allSummarized():Observable<Bussines[]> | null {
    return this.https.get<Bussines[]>(`${this.API_ALL}/all-summarized`);
  }

  allFileNumbers():Observable<Bussines[]> | null {
    return this.https.get<Bussines[]>(`${this.API_ALL}/all-file-numbers`);
  }

  
  find(id: string | number): Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }

  existRuc(bussRUC:string):Observable<Bussines>{
    return this.https.post<Bussines>(`${this.API_EXIST_RUC}`,{bussRUC} )
  }

  existFileNumber(bussFileNumber:string):Observable<Bussines>{
    return this.https.post<Bussines>(`${this.API_EXIST_FILE_NUMBER}`,{bussFileNumber} )
  }

  

  addBusinessWithPerson(object: Bussines):Observable<InterfaceParamsResponse<Bussines>>{
    return this.https.post<InterfaceParamsResponse<Bussines>>(`${this.API_ADD_BUSINESS_WHIT_PERSON}`, object);
  }
  /*Parte de codigo añadido por Ricardo */
  search(like:string):Observable<InterfaceParamsResponse<Bussines>>{
    return this.https.get<InterfaceParamsResponse<Bussines>>(`${this.API_BUSSINES}/search?like=${like}`)
  }

  findBusiness(bussId: number[]): Observable<Bussines[]> {
    return this.https.get<Bussines[]>(`${this.API_BUSSINES}/${bussId}`);
  }

  updBusinessData(object: Bussines):Observable<InterfaceParamsResponse<Bussines>>{
    return this.https.put<InterfaceParamsResponse<Bussines>>(`${this.API_BUSSINES}/upd-bussData`, object);
  }

  updPersonData(object: Bussines):Observable<InterfaceParamsResponse<Bussines>>{
    return this.https.put<InterfaceParamsResponse<Bussines>>(`${this.API_BUSSINES}/upd-perData`, object);
  }

  updAfiliationData(object: Bussines):Observable<InterfaceParamsResponse<Bussines>>{
    return this.https.put<InterfaceParamsResponse<Bussines>>(`${this.API_BUSSINES}/upd-afiData`, object);
  }

  updAditionalData(object: Bussines):Observable<InterfaceParamsResponse<Bussines>>{
    return this.https.put<InterfaceParamsResponse<Bussines>>(`${this.API_BUSSINES}/upd-adiData`, object);
  }

  /*Agregar un periodo de cada Negocio */
  addDBusinessPeriod(object: DBusinessPeriod):Observable<InterfaceParamsResponse<DBusinessPeriod>>{
    return this.https.post<InterfaceParamsResponse<DBusinessPeriod>>(`${this.API_DBUSINES_PERIODS}/addDBP`, object);
  }

  /**public allDBusinesPeriods(bussId: number): Observable<Period[]> | null {
    return this.https.get<Period[]>(`${this.API_BUSSINES}/${bussId}/periods`);
  }*/

  public allDBusinesPeriods(bussId:number): Observable<InterfaceParamsResponse<Period[]>>  {
    return this.https.get<InterfaceParamsResponse<Period[]>>(`${this.API_BUSSINES}/${bussId}/periods`);
  }


  public allStates(bussId:number): Observable<InterfaceParamsResponse<any>>  {
    return this.https.get<InterfaceParamsResponse<any>>(`${this.API_BUSSINES}/${bussId}/states`);
  }


  public delDBusinesPeriods(bussId:number, prdsId:number): Observable<InterfaceParamsResponse<Period[]>>  {
    return this.https.delete<InterfaceParamsResponse<Period[]>>(`${this.API_BUSSINES}/${bussId}/periods/${prdsId}`);
  }


  public getTellerJoinUsers(hqId:number):Observable<InterfaceParamsResponse<TellerJoinUsers>>{
    return this.https.get<InterfaceParamsResponse<TellerJoinUsers>>(`${this.API_BUSSINES}/getCantTellerUsers?hqId=${hqId}`);
  }

  public getBusinessJoinTeller(tellId:number, bussState:number, lastDigit:number, q:string): Observable<InterfaceParamsResponse<Bussines>>  {
    return this.https.get<InterfaceParamsResponse<Bussines>>(`${this.API_BUSSINES}/getBusinessJoinTeller`,{params:{tellId,bussState, lastDigit,q}});
  }

  public updateBusinessTellId(bussIds:number[], tellId:number):Observable<InterfaceParamsResponse<Bussines>>{
    return this.https.put<InterfaceParamsResponse<Bussines>>(`${this.API_BUSSINES}/${bussIds}/updTeller`,{tellId})
  }

  public updBusinessState(bussIds:number[], bussState:number, bussStateDate:Date):Observable<InterfaceParamsResponse<Bussines>>{
    return this.https.put<InterfaceParamsResponse<Bussines>>(`${this.API_BUSSINES}/${bussIds}/updStateBuss`,{bussState,bussStateDate })
  }


  /*Funciona añadida el 16/10/2022 */
  public updBusinessComment(bussIds:number[], bussComment?:String):Observable<InterfaceParamsResponse<Bussines>>{
    return this.https.put<InterfaceParamsResponse<Bussines>>(`${this.API_BUSSINES}/${bussIds}/updCommentBuss`,{bussComment})
  }

  public getBusinessForDJAnual(prdsId:number, tellId:number): Observable<InterfaceParamsResponse<Bussines>>  {
    return this.https.get<InterfaceParamsResponse<Bussines>>(`${this.API_BUSSINES}/get-business-for-dj-anual`,{params:{tellId,prdsId}});
  }
  
}
