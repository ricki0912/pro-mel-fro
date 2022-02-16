import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable , throwError} from 'rxjs';
import {Category} from '../interfaces/category';


import { catchError, retry } from 'rxjs/operators';
import { ParentService } from './parent.service';
@Injectable({
  providedIn: 'root'
})

export class CategoryService extends ParentService {

  private API_ALL=`${this.HOST_API}/api/v1/categories`
  private API_ADD=`${this.HOST_API}/api/v1/categories`
  private API_DEL=`${this.HOST_API}/api/v1/categories`

  constructor(private https: HttpClient){
    super()
  } 

   
  public all(indicator:String):Observable<Category[]> {
    return this.https.get<Category[]>(`${this.API_ALL}/${indicator}`);
  }

  public add(indicador: String, categoryObject: Category): Observable<Category> {
    return this.https.post<Category>(`${this.API_ADD}`, categoryObject)
      .pipe(
        //catchError(this.handleError('addHero', hero))
      );
  }




  public del(indicador: String, ids:number[]){
    let params = new HttpParams();
    params = params.append('ids', ids.join(','));

    this.https.delete(`${this.API_DEL}/${indicador}`, { params })
      .subscribe(
        result => console.log(result),
        err => console.error(err)
      );
  }
  /*
  public del(id: number): Observable<unknown> {
    const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteHero'))
      );
  }*/


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
