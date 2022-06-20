import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApisPeruService {
  private APIPERU=environment.X_APISPERU
  private TOKEN=environment.X_TOKEN_APISPERU
  constructor(private https:HttpClient) { 
  }
  
  findByDNI(dni: string): Observable<any>{
    return this.https.get<any>(`${this.APIPERU}/api/v1/dni/${dni}?token=${this.TOKEN}`,)
  }

  findByRUC(ruc: string): Observable<any>{
    return this.https.get<any>(`${this.APIPERU}/api/v1/ruc/${ruc}?token=${this.TOKEN}`)
  }
}
