import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParentService } from 'src/app/global/parents/parent.service';



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
}
