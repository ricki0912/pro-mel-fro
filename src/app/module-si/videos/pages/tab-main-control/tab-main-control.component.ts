import { Component, OnInit } from '@angular/core';
import { VideosCService } from '../../videos-c.service';

@Component({
  selector: 'app-tab-main-control',
  templateUrl: './tab-main-control.component.html',
  styleUrls: ['./tab-main-control.component.scss']
})
export class TabMainControlComponent implements OnInit {
  public formatLabel:number=0
  public volume:number=50

  constructor(
    private _videosCService:VideosCService

  ) { }
  ngOnInit(): void {

  }

  public playVideo=()=>this._videosCService.playVideoOnTVCR()
  public pauseVideo=()=>this._videosCService.pauseVideoOnTVCR()
  public stopVideo=()=>this._videosCService.stopVideoOnTVCR()
  public previousVideo=()=>this._videosCService.previousVideoOnTVCR()
  public nextVideo=()=>this._videosCService.nextVideoOnTVCR()
  public reloadVideos=()=>this._videosCService.reloadVideosOnTVCR()
  private setVolumeVideo=(volume:number)=>this._videosCService.setVolumeVideoOnTVCR(volume)

  public changeStateVolume=(volume:number)=>{
    volume>0?this.volume=0:this.volume=100;
    this.setVolumeVideo(this.volume)
  }

  public onVolumeChange=($event:any)=>this.setVolumeVideo($event.value)

}
