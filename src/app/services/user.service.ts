import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudApiInterface } from '../global/interfaces/crud-api.interface';
import { ParentInterface, ParentInterfaceParams } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ParentService implements CrudApiInterface{
  private API_ADD_USER_WITH_PERSON=`${this.HOST_API}/api/v1/users/add-user-with-person`
  private API_EXIST_EMAIL=`${this.HOST_API}/api/v1/users/exist-email`
  private API_ALL=`${this.HOST_API}/api/v1/users`

  constructor(private https:HttpClient) {
    super()
   }

   addUserWithPerson(object: User):Observable<User>{
    return this.https.post<User>(`${this.API_ADD_USER_WITH_PERSON}`, object);
   }

   existEmail(email:string):Observable<User>{
     return this.https.post<User>(`${this.API_EXIST_EMAIL}`,{email} )
   }

   add(object: User): Observable<ParentInterfaceParams<ParentInterface>> | Observable<ParentInterface> | null {
   return null;  
   }

   all():Observable<User[]> | null {
    return this.https.get<User[]>(this.API_ALL);
   }
   
   del(id: string | string[] | number | number[]): Observable<ParentInterfaceParams<ParentInterface>> | null {
     return null;
   }

   find(id: string | number): Observable<ParentInterface> | null {
     return null; 
   }
   upd(id: string | number, object: ParentInterface): Observable<ParentInterfaceParams<ParentInterface>> | Observable<ParentInterface> | null {
     return null;
   }
}
