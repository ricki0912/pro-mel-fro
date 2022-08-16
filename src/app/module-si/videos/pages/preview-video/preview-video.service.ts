import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviewVideoService {
  private previewVideo = new BehaviorSubject<PreviewVideo | null>(null);
  constructor(
  ) { 
  }

  onPreviewVideo(pv:PreviewVideo | null){
     this.previewVideo.next(pv)
  }

  getPreviewVideo(){
    return this.previewVideo
  }

}

export interface PreviewVideo{
  videoId:string, 
  videoFound:any
}