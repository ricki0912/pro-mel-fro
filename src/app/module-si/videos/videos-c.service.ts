import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { SOCKET_ACTION } from 'src/app/global/parents/socket.interface';
import { Videos } from 'src/app/interfaces/videos';
import { VideosService } from 'src/app/services/videos.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { WaitingLineService } from 'src/app/socket/waiting-line.service';

@Injectable({
  providedIn: 'root'
})
export class VideosCService {
 onReloadVideos = new EventEmitter<any>()

  constructor(
    private _waitingLineService:WaitingLineService, 
    private _tokenService:TokenStorageService,
    private _videosService:VideosService,
    private _showMessage:ShowMessageService,
    private _dialogEditVideo:MatDialog
    
  ) { 

  }
  /*Servicios de soket con tv*/
  playVideoOnTV=(videoId:string)=>this._waitingLineService.setSocketTV(this._tokenService.getHqId(), {action:SOCKET_ACTION.TV_SEND_VIDEO_TO_PLAY, data:videoId})
  
  playVideoOnTVCR=()=>this._waitingLineService.setSocketTV(this._tokenService.getHqId(), {action:SOCKET_ACTION.TV_PLAY_VIDEO_REMOTO,data:''})
  pauseVideoOnTVCR=()=>this._waitingLineService.setSocketTV(this._tokenService.getHqId(), {action:SOCKET_ACTION.TV_PAUSE_VIDEO_REMOTO, data: ''})
  stopVideoOnTVCR=()=>this._waitingLineService.setSocketTV(this._tokenService.getHqId(), {action:SOCKET_ACTION.TV_STOP_VIDEO_REMOTO, data: ''})
  nextVideoOnTVCR=()=>this._waitingLineService.setSocketTV(this._tokenService.getHqId(), {action:SOCKET_ACTION.TV_NEXT_VIDEO_REMOTO, data: ''})
  previousVideoOnTVCR=()=>this._waitingLineService.setSocketTV(this._tokenService.getHqId(), {action:SOCKET_ACTION.TV_PREVIOUS_VIDEO_REMOTO, data: ''})
  reloadVideosOnTVCR=()=>this._waitingLineService.setSocketTV(this._tokenService.getHqId(), {action:SOCKET_ACTION.TV_RELOAD_VIDEOS_REMOTO, data: ''})
  setVolumeVideoOnTVCR=(volume:number)=>this._waitingLineService.setSocketTV(this._tokenService.getHqId(), {action:SOCKET_ACTION.TV_SET_VOLUME_VIDEO_REMOTO, data: volume})

  addVideoToListOnTVCR=(videoId:string)=>this._waitingLineService.setSocketTV(this._tokenService.getHqId(), {action:SOCKET_ACTION.TV_ADD_VIDIO_TO_LIST, data: videoId})


  /*Agregar videos a la base de datos*/
  addVideos(videos: Videos): boolean {
    this._videosService.addVideos(videos).subscribe({
      next: data => {
        /**mostramos un mensaje de exito */
        this._showMessage.success({ message: data.msg });
        /*obtenemos el ultimo business devuelto por el backend y que viene en data */
        //const videos = data.data as Videos[]
        this.onReloadVideos.emit()
      },
      error: error => {
        /**Mostramos un mensaje de error y pasamos una funcion para reintenar nuevamente añdir el usuario  */
        this._showMessage.error({ message: error.error.message, action: () => this.addVideos(videos) })
      }
    });
    return true;
  }

  enableDisableVideos(id: number[]):boolean{
    this._videosService.enableDisableVideos(id).subscribe({
      next: data=>{
        this._showMessage.success({message: data.msg});
        //this.readCRUD();
        
        
      },
      error: error=>{
        this._showMessage.error({message: error.error.message})
      }
    })
    return true;
  }

  delVideos(ids:number[]){
    //let ids = this.selection.selected.reduce((a: number[], b: Videos) => (b.vidId == null) ? a : [...a, b.vidId], []);
    this.wantDelete(()=>this.deleteCRUD(ids))
  }

  wantDelete(d:()=>void){
    this._dialogEditVideo
      .open(DialogConfirmationComponent, {
        data: `Esta seguro que desea Eliminar.`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          d();
        } else {

        }
      });
  }

  deleteCRUD(id: number[]): boolean {
    this._videosService.delVideos(id).subscribe({
      next: data=>{
        this._showMessage.success({message: data.msg});
        //this.readCRUD();
        
        
      },
      error: error=>{
        this._showMessage.error({message: error.error.message})
      }
    })
    return true;
  }

  


}
