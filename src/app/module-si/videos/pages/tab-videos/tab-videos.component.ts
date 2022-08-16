import { Component, OnInit } from '@angular/core';
import { Videos } from 'src/app/interfaces/videos';
import { VideosService } from 'src/app/services/videos.service';
import { VideosCService } from '../../videos-c.service';
import { PreviewVideoService } from '../preview-video/preview-video.service';

@Component({
  selector: 'app-tab-videos',
  templateUrl: './tab-videos.component.html',
  styleUrls: ['./tab-videos.component.scss']
})
export class TabVideosComponent implements OnInit {
 
  public videos:Videos[]=[]
  ybSearch:string=''
  constructor(
    private _videosService: VideosService, 
    private _videosCService:VideosCService,
    private _previewVideo:PreviewVideoService

  ) {
    
   }

  ngOnInit(): void {
    this.readCRUD()
    this._videosCService.onReloadVideos.subscribe((e)=>this.readCRUD())
  }



  readCRUD(): boolean {
    this._videosService.all()?.subscribe({
      next: data => {
        this.videos = data;
      },
      error: error => {
        
      }
    })
    return false;
  }


  beforeSearch(){
    
  }
  
  beforePlay=(videoId:string)=>{this._previewVideo.onPreviewVideo({videoId,videoFound:{}})}

  
  playVideoOnTV=(videoId:string)=>this._videosCService.playVideoOnTV(videoId)

  enableDisableVideos=(item:Videos)=>{this._videosCService.enableDisableVideos([item.vidId || -1]);
    item.vidState=(this.parseInt(item.vidState)==1)?"2":"1";
  }

  parseInt(vidState:string):number{
    return parseInt(vidState)
  }

  delVideos=(item:Videos)=>{
    this._videosCService.delVideos([item.vidId || -1])
    let index=this.videos.findIndex((e)=>e.vidId==item.vidId);
    this.videos.splice(index,1)
  }

}
