import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { Role } from '../interfaces/role';
import { Teller } from '../interfaces/teller';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends ParentService {
  private API_ROLE = `${this.HOST_API}/api/v1/roles`
  
  constructor(private https: HttpClient) {
    super()
  }
  public all(): Observable<InterfaceParamsResponse<Role>> {
    return this.https.get<InterfaceParamsResponse<Role>>(this.API_ROLE);
  }


  public add(object: Role): Observable<InterfaceParamsResponse<Role>> {
    return this.https.post<InterfaceParamsResponse<Role>>(`${this.API_ROLE}`, object);
  }

  public del(id: number): Observable<InterfaceParamsResponse<Role>> {
    return this.https.delete<InterfaceParamsResponse<Role>>(`${this.API_ROLE}/${id}`)
  }

  public upd(object: Role): Observable<InterfaceParamsResponse<Role>> {
    return this.https.put<InterfaceParamsResponse<Role>>(`${this.API_ROLE}/${object.id}}`, object);

  }

  public find(id: number): Observable<Teller> {
    return this.https.get<Teller>(`${this.API_ROLE}/${id}`)
  }

  public getPersmissions(roleName:string): Observable<InterfaceParamsResponse<Role>> {
    return this.https.get<InterfaceParamsResponse<Role>>(`${this.API_ROLE}/${roleName}/permissions`);

  }

  public syncPermissions(roleName:string, permissionsIds:number[]): Observable<InterfaceParamsResponse<Role>> {
    return this.https.put<InterfaceParamsResponse<Role>>(`${this.API_ROLE}/${roleName}/sync-permissions`, permissionsIds);
  }

  
}
