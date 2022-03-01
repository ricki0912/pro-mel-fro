import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';


const helper= new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  hola=environment.API_URL;
  constructor(private https: HttpClient) { }

  login(authData: User):Observable<any>{
    return this.https.post<UserResponse>(`${environment.API_URL}/auth/login`, authData).pipe(
      map((res: UserResponse)=>{
        this.saveToken(res.userResToken)
        console.log('res', res);
      }), catchError(e=>this.handleError(e))
    )
  }
  logout():void{
    localStorage.removeItem('token')
  }

  private readToken():void{}
  private saveToken(token: string):void{
    localStorage.setItem('token', token)
  }
/* 0   private checkToken():void{
     const userToken=localStorage.getItem('token');
     
if (userToken == null)
      userToken = undefined;

  return helper.isTokenExpired(userToken);
     
     //userToken=userToken===null? undefined:userToken;
     //const isExpired = helper.isTokenExpired(userToken)
   
     //set userisLogged=isExpired
   } */


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
