import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private API_YOUTUBE=environment.YOUTUBE;
  private API_YOUTUBE_TOKEN=environment.YOUTUBE_TOKEN
  constructor(private https:HttpClient) { 
  }
  
  search(q: string, pageToken?:string): Observable<any>{
    //https://www.googleapis.com/youtube/v3/search
    //part=snippet&maxResults=20&q=YOURKEYWORD&type=video&key=AIzaSyBBSy1_Qi6o5i8ZkdecHEkYpqs2CayrH40
    //https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=hola&type=video&key=AIzaSyBBSy1_Qi6o5i8ZkdecHEkYpqs2CayrH40
    return this.https.get<any>(`${this.API_YOUTUBE}?part=snippet&maxResults=10&q=${q}${(pageToken)?'pageToken='+pageToken:''}&type=video&key=${this.API_YOUTUBE_TOKEN}`)
  }
}
