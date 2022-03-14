import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudApiInterface } from '../global/interfaces/crud-api.interface';
import { ParentInterface, InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ParentService implements CrudApiInterface{
  private API_ADD_USER_WITH_PERSON=`${this.HOST_API}/api/v1/users/add-user-with-person`
  private API_UPD_USER_WITH_PERSON=`${this.HOST_API}/api/v1/users/upd-user-with-person`
  private API_EXIST_EMAIL=`${this.HOST_API}/api/v1/users/exist-email`
  private API_ALL=`${this.HOST_API}/api/v1/users`

  constructor(private https:HttpClient) {
    super()
   }

   addUserWithPerson(object: User):Observable<InterfaceParamsResponse<User>>{
    return this.https.post<InterfaceParamsResponse<User>>(`${this.API_ADD_USER_WITH_PERSON}`, object);
   }

   updUserWithPerson(object: User):Observable<InterfaceParamsResponse<User>>{
    return this.https.put<InterfaceParamsResponse<User>>(`${this.API_UPD_USER_WITH_PERSON}`, object)
   }

   existEmail(email:string):Observable<User>{
     return this.https.post<User>(`${this.API_EXIST_EMAIL}`,{email} )
   }

   changeState(id: number[], state:number){
      //return this.https.post
   }

   add(object: User): Observable<InterfaceParamsResponse<ParentInterface>> | Observable<ParentInterface> | null {
   return null;  
   }

   all():Observable<User[]> | null {
    return this.https.get<User[]>(this.API_ALL);
   }
   
   del(id: string | string[] | number | number[]): Observable<InterfaceParamsResponse<ParentInterface>> | null {
     return null;
   }

   find(id: string | number): Observable<ParentInterface> | null {
     return null; 
   }
   upd(id: string | number, object: ParentInterface): Observable<InterfaceParamsResponse<ParentInterface>> | Observable<ParentInterface> | null {
     return null;
   }
}
