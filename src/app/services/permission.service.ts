import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { Permission } from '../interfaces/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends ParentService {
  private API_PERMISSION = `${this.HOST_API}/api/v1/permissions`
  constructor(private https: HttpClient) {
    super()
  }
  public all(): Observable<InterfaceParamsResponse<Permission>> {
    return this.https.get<InterfaceParamsResponse<Permission>>(this.API_PERMISSION);
  }


  public add(object: Permission): Observable<InterfaceParamsResponse<Permission>> {
    return this.https.post<InterfaceParamsResponse<Permission>>(`${this.API_PERMISSION}`, object);
  }

  public del(id: number): Observable<InterfaceParamsResponse<Permission>> {
    return this.https.delete<InterfaceParamsResponse<Permission>>(`${this.API_PERMISSION}/${id}`)
  }

  public upd(object: Permission): Observable<InterfaceParamsResponse<Permission>> {
    return this.https.put<InterfaceParamsResponse<Permission>>(`${this.API_PERMISSION}/${object.id}}`, object);

  }

  public find(id: number): Observable<Permission> {
    return this.https.get<Permission>(`${this.API_PERMISSION}/${id}`)
  }
  
}
