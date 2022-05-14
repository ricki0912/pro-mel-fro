import { Component, HostListener, OnInit } from '@angular/core';

import { YouTubePlayer } from "@angular/youtube-player";

import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { VideosService } from 'src/app/services/videos.service';
import { map } from 'rxjs';
import { Videos, VIDEOS_STATE } from 'src/app/interfaces/videos';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  public width = 800
  public height = 500

  private player?: YouTubePlayer;
  public ytEvent: any;

  /*Esto actualizar de acuerdo a base de datos*/
  public videos: string[] = ["rAQl-TTI4bQ", "euCqAq6BRa4", "k4n4nVpRacU", "UigG1_rWtI4"]

  constructor(
    private _sanitizer: DomSanitizer,
    private videosService: VideosService,

  ) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.readVideos()
  }

  getVideoIframe(url: string) {
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];
    console.log(video)
    return video//this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video/*+'?autoplay=1&mute=1&loop=1'*/); 
  }

  onStateChange(event: any) {
    this.ytEvent = event.data;
    if (this.ytEvent == null || this.ytEvent == undefined || this.ytEvent == 0) {
      const randomElement = this.videos[Math.floor(Math.random() * this.videos.length)];
      console.log(randomElement);
      event.target.loadVideoById({ videoId: randomElement })
    }
  }

  savePlayer(player: any, p: YouTubePlayer) {
    console.log(player)
    this.player = p;

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
    this.height = screenHeight * 0.6
  }

  private readVideos() {
    this.videosService.all()?.subscribe({
      next: d => {
        this.videos=this.mapData(d)
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

}

