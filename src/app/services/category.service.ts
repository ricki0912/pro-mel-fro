import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Category } from '../interfaces/category';


import { catchError, retry } from 'rxjs/operators';
import { ParentService } from '../global/parents/parent.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParentInterface, InterfaceParamsResponse } from '../global/parents/parent.interface';


@Injectable({
  providedIn: 'root'
})

export class CategoryService extends ParentService {

  private API_ALL = `${this.HOST_API}/api/v1/categories`
  private API_ADD = `${this.HOST_API}/api/v1/categories`
  private API_UPD = `${this.HOST_API}/api/v1/categories`
  private API_DEL = `${this.HOST_API}/api/v1/categories`
  private API_FIND = `${this.HOST_API}/api/v1/categories`
  private API_SEARCH_BY_CODE = `${this.HOST_API}/api/v1/categories/search-by-code`
  private API_CATEGORY = `${this.HOST_API}/api/v1/categories`

  constructor(private https: HttpClient) {
    super()
  }

  public all(): Observable<Category[]> {
    return this.https.get<Category[]>(this.API_ALL);
  }

  public allByHQ(hqId: number): Observable<Category[]> {
    return this.https.get<Category[]>(`${this.API_CATEGORY}/all-by-hq?hqId=${hqId}`);
  }



  add(object: Category): Observable<InterfaceParamsResponse<Category>> {
    return this.https.post<InterfaceParamsResponse<Category>>(`${this.API_ADD}`, object);
  }

  public del(id: number): Observable<InterfaceParamsResponse<Category>> {
    return this.https.delete<InterfaceParamsResponse<Category>>(`${this.API_ADD}/${id}`)
  }

  public upd(object: Category): Observable<InterfaceParamsResponse<ParentInterface>> {
    return this.https.put<InterfaceParamsResponse<Category>>(`${this.API_UPD}`, object);

  }

  public find(id: number): Observable<Category> {
    return this.https.get<Category>(`${this.API_FIND}/${id}`)
  }

  public searchByCode(code: string): Observable<Category> {
    return this.https.get<Category>(`${this.API_SEARCH_BY_CODE}/${code}`)
  }


}
