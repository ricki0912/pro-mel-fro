import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private showMessageService:ShowMessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone()
    //request.
    return next.handle(request).pipe(
      catchError((e)=>this.handleError(e))
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      this.showMessageService.success({message:'Ocurrió un error'})
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.

      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    console.log("Prqando acceso ")

    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
