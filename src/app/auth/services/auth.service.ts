import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParentService } from 'src/app/global/parents/parent.service';
import { Password } from '../interfaces/password';
import { InterfaceParamsResponse } from 'src/app/global/parents/parent.interface';
import { User } from 'src/app/interfaces/user';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ParentService{ 
  AUTH_API = `${this.HOST_API}/api/v1/auth/` ;
  constructor(private http: HttpClient) { 
    super()
  }


  login(email: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'signin', {
      email,
      password
    }, httpOptions);
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'signup', {
      name,
      email,
      password
    }, httpOptions);
  }

  logout(){
    return this.http.post(this.AUTH_API + 'logout', httpOptions);
  }

  
  changePasswordWithAuth(p:Password):Observable<InterfaceParamsResponse<any>> {
    return this.http.put<InterfaceParamsResponse<any>>(this.AUTH_API+'change-password-with-auth', p)
  }

  updUserWithPerson(object: User):Observable<InterfaceParamsResponse<User>>{
    return this.http.put<InterfaceParamsResponse<User>>(this.AUTH_API+'upd-user-with-person-auth', object)
   }

   uploadProfileImage(profileImage:File):Observable<InterfaceParamsResponse<any>>{
      console.log("imagen", profileImage)
      let form = new FormData();
      form.append('profileImage', profileImage, profileImage.name);
      let headers=new HttpHeaders()
      headers.append('Content-Type','multipart/form-data');
      headers.append('Accept', 'application/json');

      return this.http.post<InterfaceParamsResponse<any>>(this.AUTH_API + 'upload-profile-image-with-auth', form,{headers: headers});
   }

   updUserWithPersonWithAuth(object:User):Observable<InterfaceParamsResponse<User>>{
    return this.http.put<InterfaceParamsResponse<User>>(this.AUTH_API+'upd-user-with-person-with-auth', object)
   }
}