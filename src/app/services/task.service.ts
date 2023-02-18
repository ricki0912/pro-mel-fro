import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse, ParentInterface } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { Role } from '../interfaces/role';
import { TASK_KIND_DECL, TASK_STATES } from '../interfaces/task';
import { Teller } from '../interfaces/teller';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends ParentService {
  private API_TASK = `${this.HOST_API}/api/v1/tasks`
  
  constructor(private https: HttpClient) {
    super()
  }
  add(object: ParentInterface): Observable<InterfaceParamsResponse<ParentInterface>> | Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }
  upd(id: string | number, object: ParentInterface): Observable<InterfaceParamsResponse<ParentInterface>> | Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }
  del(id: string | number): Observable<InterfaceParamsResponse<ParentInterface>> | null {
    throw new Error('Method not implemented.');
  }


  allBy(p:{tsksState: TASK_STATES, tsksKindDecl: TASK_KIND_DECL} ): Observable<InterfaceParamsResponse<Task>> {
    return this.https.get<InterfaceParamsResponse<Task>>(`${this.API_TASK}/all-by`, {params: p});
  }



  /*
  find(id: string | number): Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }

  addCards(object: Cards):Observable<InterfaceParamsResponse<Cards>>{
    return this.https.post<InterfaceParamsResponse<Cards>>(`${this.API_ADD_CARDS}`, object);
  }

  public updCards(object: Cards): Observable<InterfaceParamsResponse<ParentInterface>> {
    return this.https.put<InterfaceParamsResponse<Cards>>(`${this.API_UPD_CARDS}`, object);
  }

  public delCards(id: number[]): Observable<InterfaceParamsResponse<Cards>> {
    return this.https.delete<InterfaceParamsResponse<Cards>>(`${this.API_DEL_CARDS}/${id}`);
  }

  public enableDisableCards(id: number[]): Observable<InterfaceParamsResponse<Cards>> {
    return this.https.delete<InterfaceParamsResponse<Cards>>(`${this.API_STATE_CARDS}/${id}`);
  }*/

  
}
