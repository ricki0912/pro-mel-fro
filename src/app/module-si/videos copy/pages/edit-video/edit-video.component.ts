import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { Videos } from 'src/app/interfaces/videos';
import { YoutubeService } from 'src/app/servicesx/youtube.service'
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit, OnDestroy {

  title = 'Añadir un Video Nuevo';
  ybSearch:string=''
  ybResponse:any={}

  videosBeforeUpd: Videos | null = null;

  constructor(
    private youtubeService:YoutubeService,
    private messageSerice:ShowMessageService,
    private sanitizer:DomSanitizer,
    public mediaObserver: MediaObserver, /*esta a la escucha cuando se renderiza */
    private fb: FormBuilder, /*es apra los formularios */
    //private showMessage: ShowMessageService, /*este servicio es para invocar los mensaje de alerta */
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Videos, type: number }, /**campturamos el usuario que se recibe com parametro cuando abrimos el modal */
    private dialogRef: MatDialogRef<EditVideoComponent>,
  ) { }

  ngOnInit(): void {
    /*observador para renderizar */
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })

    /*verifcamos y para actualizar o añadir */
    this.setTypeDialog();
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  /*Para renderizar filas */
  cols: number = 1;
  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }
  mediaSub!: Subscription;
  /**Para renderizar filas */

  /*Formulario para añadir negocio con persona */
  videosForm: FormGroup = this.fb.group({
    vidName : ['',Validators.required],
    vidLink : ['',Validators.required],
    vidState : ['',Validators.required]
  });


  /****METODO PARA VERIFICAR, AGREGAR O ACTUALIZAAR*** */
  setTypeDialog() {

    /**verificamos que sera actualizar, de sera asi, mostramos los datos del usuario en cada campo */
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      this.videosBeforeUpd = this.paramsDialog.row;
      this.title = this.videosBeforeUpd.vidName || ''

      /*redirizar informacion en el formulario*/
      this.videosForm.get('vidName')?.setValue(this.videosBeforeUpd.vidName);
      this.videosForm.get('vidLink')?.setValue(this.videosBeforeUpd.vidLink);
      this.videosForm.get('vidState')?.setValue(this.videosBeforeUpd.vidState?.trim());
    }
  }

/**A TRAVES DE ESTE METODO SE DEVUELVE EL NEGOCIO A LA VENTANA ANTERIOR */
  onReturn = (videos: Videos): void => this.dialogRef.close(videos);

  /*AQUI VALIDA QUE TODO ESTA OK ANTES DE RETORNAR EL USUARIO A LA VENTA ANTERIOR */
  addVideos(): boolean {
    const videos: Videos = this.videosForm.value;
    this.onReturn(videos);
    return true;
  }

  updVideos(): boolean {
    const videos : Videos = this.videosForm.value;
    videos.vidId = this.videosBeforeUpd?.vidId;
    this.onReturn(videos);
    return true;
  }

  addUpdVideos(): boolean{
    return (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) ?
    this.updVideos():
    this.addVideos();
  }

  /* Para buscar*/
  beforeSearch(){
    if(this.ybSearch)
      this.search(this.ybSearch)
  }

  private search(q:string){
    this.youtubeService.search(q).subscribe({
      next:(d)=>{
        console.log(d)
        this.ybResponse=d
      }, 
      error:(e)=>{
        console.log(e)
        this.messageSerice.error({message: 'Al parcer algo anda mal. '+e.error.message})
      }
    })
  }
  /*Otras funciones */
  getVideoSource(videoId:String){
    return  this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+videoId)
    
  }

}

interface GridResponsive {
  [key: string]: number
}

