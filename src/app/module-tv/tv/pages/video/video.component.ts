import { Component, HostListener, OnInit } from '@angular/core';

import { YouTubePlayer } from "@angular/youtube-player";

import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { VideosService } from 'src/app/services/videos.service';
import { map } from 'rxjs';
import { Videos, VIDEOS_STATE } from 'src/app/interfaces/videos';
import { WaitingLineService } from 'src/app/socket/waiting-line.service';
import { ActivatedRoute } from '@angular/router';
import { SOCKET_ACTION } from 'src/app/global/parents/socket.interface';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  //current postion
  private currentPosition:number=0;


  private hqId:number=0
  public width = 800
  public height = 500

  private player?: YouTubePlayer;
  public ytEvent: any;
  public ytEventTarget:any 
  /*Esto actualizar de acuerdo a base de datos*/
  public videos: string[] = ["rAQl-TTI4bQ", "euCqAq6BRa4", "k4n4nVpRacU", "UigG1_rWtI4"]

  private listOldPlayVideos:string[]=[]

  constructor(
    private _sanitizer: DomSanitizer,
    private videosService: VideosService,
    private _waitingLineService:WaitingLineService, 
    private _activatedRouted:ActivatedRoute


  ) {
    this.getScreenSize();
    this.listenRoute((hqId)=>this.getSocketTV(this.hqId))
  }

  ngOnInit(): void {
    this.readVideos()
  }

  private nextPosition(){
    if(this.currentPosition>=this.videos.length-1){
      this.currentPosition=0
    }else{
      this.currentPosition++
    }
    return this.currentPosition
  }
  private previousPosition(){
    if(this.currentPosition==0){
      this.currentPosition=this.videos.length-1
    }else{
      this.currentPosition--
    }
    return this.currentPosition
  }
  private listenRoute(c:(o:any)=>void){
    this._activatedRouted.params.subscribe(params=>{
      this.hqId=parseInt(params['hqId'] || 0)
      c(this.hqId)
    });
  }

  getVideoIframe(url: string) {
    var video, results;
    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];
    return video//this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video/*+'?autoplay=1&mute=1&loop=1'*/); 
  }

  onStateChange(event: any) {
    this.ytEvent = event.data;
    this.ytEventTarget=event.target
    if (this.ytEvent == null || this.ytEvent == undefined || this.ytEvent == 0) {
      //const randomElement = this.videos[Math.floor(Math.random() * this.videos.length)];
      //event.target.loadVideoById({ videoId: randomElement })
      event.target.loadVideoById({ videoId: this.videos[this.nextPosition()] })
     
      
    }
  }

  savePlayer(player: any, p: YouTubePlayer) {
    this.player = p;
    this.ytEventTarget=player.target

    console.log(this.ytEventTarget)
    //this.ytEventTarget.mute()
    //this.ytEventTarget.playVideo()
  }

  playVideo() {
    //this.player.videoId="fkjYvDUSgfw"
    this.player?.playVideo();
  }

  pauseVideo() {
    this.player?.pauseVideo();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {

    let screenHeight = window.innerHeight;
    let screenWidth = window.innerWidth;
    console.log(screenHeight, screenWidth);
    this.width = screenWidth
    this.height = screenHeight * 0.8
  }

  private readVideos() {
    this.videosService.all()?.subscribe({
      next: d => {
        this.videos=this.fisherYatesShuffle(this.mapData(d))
      }
    })
  }
  private mapData(data: Videos[]): string[] {
    let r = data.reduce((a: string[], e: Videos) => (
      (parseInt(e.vidState||"0") == VIDEOS_STATE.ENABLE) ?
        [...a, this.getVideoIframe(e.vidLink || "")]
        :
        a
    ), [])
    return r
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  /*Cambios ultimos y recientes */

  getSocketTV=(hqId:number)=>this._waitingLineService.getSocketTV(hqId).subscribe({
      next:d=>{
        const action=d.action;
        switch(action){
          case SOCKET_ACTION.TV_SEND_VIDEO_TO_PLAY:
            if(this.player){
            //this.player.videoId=d.data as string
            //this.player.stopVideo()
            //this.ytEvent?.playVideo();  
              let videoId=d.data as string
            this.ytEventTarget.loadVideoById({ videoId: this.getVideoIframe(videoId) })

            }
          break;
          case SOCKET_ACTION.TV_PLAY_VIDEO_REMOTO:
            this.ytEventTarget.playVideo()
            console.log(this.ytEventTarget)
          break;
          case SOCKET_ACTION.TV_PAUSE_VIDEO_REMOTO:
            this.player?.pauseVideo()
            break;
          case SOCKET_ACTION.TV_STOP_VIDEO_REMOTO:
            this.player?.stopVideo()

            break;
            
          case SOCKET_ACTION.TV_NEXT_VIDEO_REMOTO:
           this.ytEventTarget.loadVideoById({ videoId: this.videos[this.nextPosition()] })
  
          //this.ytEventTarget.nextVideo()
            break;
          
          case SOCKET_ACTION.TV_PREVIOUS_VIDEO_REMOTO:
            this.ytEventTarget.loadVideoById({ videoId: this.videos[this.previousPosition()] })

            break;

          case SOCKET_ACTION.TV_RELOAD_VIDEOS_REMOTO:
              this.readVideos()
            break;

          case SOCKET_ACTION.TV_SET_VOLUME_VIDEO_REMOTO:
            if(this.ytEventTarget.isMuted)
            this.ytEventTarget.unMute()

              this.player?.setVolume(d.data as number)

            break;

            case SOCKET_ACTION.TV_ADD_VIDIO_TO_LIST:
              this.videos.push(d.data as string)
            break;
          default:
          break;
        }
      }
    })
  

     fisherYatesShuffle(arr:string[]){
      for(let i =arr.length-1 ; i>0 ;i--){
          let j = Math.floor( Math.random() * (i + 1) ); //random index
          [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
      }
      return arr
  }
}

