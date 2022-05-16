import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiPeruService {
  private API_PERU=environment.X_API_PERU
  constructor(private https:HttpClient) { 
  }
  
  findByDNI(dni: string): Observable<any>{
    return this.https.get<any>(`${this.API_PERU}/api/dni/${dni}`)
  }

  findByRUC(ruc: string): Observable<any>{
    return this.https.get<any>(`${this.API_PERU}/api/ruc/${ruc}`)
  }
}
