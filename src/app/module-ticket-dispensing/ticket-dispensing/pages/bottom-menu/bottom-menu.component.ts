import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { ParamsTicketDispensing } from 'src/app/interfaces/params-ticket-dispensing';

declare var electron: any;

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss']
})
export class BottomMenuComponent {

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomMenuComponent>) {}
  
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  public printTest(){
    const t :ParamsTicketDispensing = {
      dateTicket: "Fecha y Hora",
      numberTicket: "NT",
      tellerTicket: "VT",/*ventanilla*/
      phraseTicket: "Se ha imprimido correctamente",
      codeQrTicket: 'http://melendresauditores.com/'
    }
    try {
      electron.ipcRenderer.send('print-ticket', t)

    } catch (error) {

    }

  }

  configServer(){
     try {
      electron.ipcRenderer.send('create-server-config',{})

    } catch (error) {

    }
  }

  fullScreen(){
    try {
      electron.ipcRenderer.send('create-server-config',{})
    } catch (error) {

    }

  }

  refreshView(){
     try {
      electron.ipcRenderer.send('refresh-view',{})
    } catch (error) {

    }
    
  }




}