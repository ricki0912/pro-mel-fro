import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { SOCKET_ACTION } from 'src/app/global/parents/socket.interface';
import { Teller } from 'src/app/interfaces/teller';
import { Videos } from 'src/app/interfaces/videos';
import { VideosService } from 'src/app/services/videos.service';
import { YoutubeService } from 'src/app/servicesx/youtube.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { WaitingLineService } from 'src/app/socket/waiting-line.service';
import { VideosCService } from '../../videos-c.service';
import { PreviewVideoService } from '../preview-video/preview-video.service';

@Component({
  selector: 'app-tab-search',
  templateUrl: './tab-search.component.html',
  styleUrls: ['./tab-search.component.scss']
})
export class TabSearchComponent implements OnInit {


  ybSearch:string=''
  ybResponse:any={}
  isLoading:boolean=false;  
  

  

  constructor(
    private youtubeService:YoutubeService,
    private messageSerice:ShowMessageService,
    private sanitizer:DomSanitizer, 
    private previewVideoService:PreviewVideoService, 
    private _waitingLineService:WaitingLineService, 
    private _tokenService:TokenStorageService,
    private _videosService:VideosService,
    private _showMessage:ShowMessageService,
    private _videosCService:VideosCService

    ) { 
        
    }

  ngOnInit(): void {
  }

  beforeSearch(){
    console.log(this.ybSearch)
    if(this.ybSearch)
      this.search(this.ybSearch)
  }

  private search(q:string){
    this.isLoading=true
    this.youtubeService.search(q).subscribe({
      next:(d)=>{
        this.ybResponse=d
        this.isLoading=false
      }, 
      error:(e)=>{
        this.messageSerice.error({message: 'Al parcer algo anda mal. '+e.error.message})
        this.isLoading=false
      }
    })
  }
  /*Otras funciones */
  getVideoSource(videoId:String){
    return  this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+videoId)
    
  }

beforePlay=(videoId:string, videoFound:any)=>this.previewVideoService.onPreviewVideo({videoId,videoFound })

playVideoOnTV=(videoId:string)=>this._videosCService.playVideoOnTV(videoId)

beforeAddVideos(ybItem:any){
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



}
