import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudApiInterface } from '../global/interfaces/crud-api.interface';
import { ParentInterface, InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { Videos } from '../interfaces/videos';

@Injectable({
  providedIn: 'root'
})
export class VideosService extends ParentService implements CrudApiInterface {
  private API_ALL = `${this.HOST_API}/api/v1/videos`
  private API_ADD_VIDEOS = `${this.HOST_API}/api/v1/videos/add-videos`

  constructor(private https:HttpClient) {
    super()
  }

  add(object: ParentInterface): Observable<InterfaceParamsResponse<ParentInterface>> | Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }
  upd(id: string | number, object: ParentInterface): Observable<InterfaceParamsResponse<ParentInterface>> | Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }
  del(id: string | number): Observable<InterfaceParamsResponse<ParentInterface>> | null {
    throw new Error('Method not implemented.');
  }
  all(): Observable<Videos[]> | null {
    return this.https.get<Videos[]>(this.API_ALL);
  }
  find(id: string | number): Observable<ParentInterface> | null {
    throw new Error('Method not implemented.');
  }

  addVideos(object: Videos):Observable<InterfaceParamsResponse<Videos>>{
    return this.https.post<InterfaceParamsResponse<Videos>>(`${this.API_ADD_VIDEOS}`, object);
  }
}
