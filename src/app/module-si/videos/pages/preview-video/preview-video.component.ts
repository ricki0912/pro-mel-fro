import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Videos } from 'src/app/interfaces/videos';
import { VideosCService } from '../../videos-c.service';
import { PreviewVideo, PreviewVideoService } from './preview-video.service';

@Component({
  selector: 'app-preview-video',
  templateUrl: './preview-video.component.html',
  styleUrls: ['./preview-video.component.scss']
})
export class PreviewVideoComponent implements OnInit {

  public  previewVideo:PreviewVideo|null =null
  constructor(    
      private sanitizer:DomSanitizer,
      private previewVideoService:PreviewVideoService,
      private _videosCService:VideosCService

    ) { }

  ngOnInit(): void {
    this.getPreviewVideo()
  }
  getVideoSource(videoId:String){
    //return  this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+videoId)
    return  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+videoId+"?origin=https://localhost&showinfo=0&video-id="+videoId+"&enablejsapi=1&widgetid=1&color=white&modestbranding=1&rel=0") 
    
  }
  public getPreviewVideo(){
    this.previewVideoService.getPreviewVideo().subscribe(
      {
        next:(pv)=>{
          this.previewVideo=pv
        }, 
        error:(e)=>{

        }
      }
    )
  }
  beforeClose=()=>this.previewVideoService.onPreviewVideo(null)

  beforeAdd(ybItem:any){
    let video:Videos={
      vidLink:ybItem.id.videoId,
      vidName:ybItem.snippet.title,
      vidState:'1',
      vidChannelTitle:ybItem.snippet.channelTitle,
      vidDescription:ybItem.snippet.description,
      vidImgLinkDefault:ybItem.snippet.thumbnails.default.url,
      vidImgLinkMedium:ybItem.snippet.thumbnails.medium.url,
      vidImgLinkHigh:ybItem.snippet.thumbnails.high.url
    }
    this._videosCService.addVideos(video)
    this._videosCService.addVideoToListOnTVCR(video.vidLink)

  }

  playVideoOnTV=(videoId:string)=>this._videosCService.playVideoOnTV(videoId)


  addAndPlayVideoOnTV=(videoId:string, ybItem:any)=>{
    this.beforeAdd(ybItem)
    this.playVideoOnTV(videoId)
  }
}
