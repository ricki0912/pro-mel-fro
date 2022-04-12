import { Component, Inject, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { Videos } from 'src/app/interfaces/videos';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {

  title = 'Añadir un Video Nuevo';
  videosBeforeUpd: Videos | null = null;

  constructor(
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
    vidLink : ['',Validators.required]
  });


  /****METODO PARA VERIFICAR, AGREGAR O ACTUALIZAAR*** */
  setTypeDialog() {

    /**verificamos que sera actualizar, de sera asi, mostramos los datos del usuario en cada campo */
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      this.videosBeforeUpd = this.paramsDialog.row;
      this.title = this.videosBeforeUpd.vidName || ''

      /*redirizar informacion en el formulario*/
      this.videosForm.get('vidName')?.setValue(this.videosBeforeUpd.vidName)
      this.videosForm.get('vidLink')?.setValue(this.videosBeforeUpd.vidLink)
    }
  }

/**A TRAVES DE ESTE METODO SE DEVUELVE EL NEGOCIO A LA VENTANA ANTERIOR */
  onReturn = (videos: Videos): void => this.dialogRef.close(videos);

  /*AQUI VALIDA QUE TODO ESTA OK ANTES DE RETORNAR EL USUARIO A LA VENTA ANTERIOR */
  addVideos(): boolean {
    const videos: Videos = this.videosForm.value;
    this.onReturn(videos);
    return true
  }

}

interface GridResponsive {
  [key: string]: number
}
