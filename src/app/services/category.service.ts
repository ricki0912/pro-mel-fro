import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable , throwError} from 'rxjs';
import {Category} from '../interfaces/category';


import { catchError, retry } from 'rxjs/operators';
import { ParentService } from '../global/parents/parent.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ParentInterface, ParentInterfaceParams } from '../global/parents/parent.interface';


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

  public all(): Observable<Category[]>  {
      return this.https.get<Category[]>(this.API_ALL);
  }


  add(object: Category):Observable<ParentInterfaceParams<Category>>{
    return this.https.post<ParentInterfaceParams<Category>>(`${this.API_ADD}`, object);
  }

  public del(id: string | number): Observable<ParentInterfaceParams<ParentInterface>> |null {
      return null;
  }

  public upd(id: string | number, object: ParentInterface): Observable<ParentInterfaceParams<ParentInterface>> | Observable<ParentInterface> | null {
      return null
  }

  public find(id: string | number): Observable<ParentInterface> | null {
      return null
  }


}
