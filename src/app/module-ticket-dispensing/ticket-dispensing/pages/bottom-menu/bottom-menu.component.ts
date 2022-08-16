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
    console.log("holaaa")

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
      electron.ipcRenderer.send('create-server-config', {dateTicket:'25/04/231', numberTicket:'2 PARAMETRO', categoryTicket:'CATEGORIA'})

      //electron.ipcRenderer.send('create-server-config',{})

    } catch (error) {

    }
  }

  

  refreshView(){
     try {
      electron.ipcRenderer.send('refresh-view',{})
    } catch (error) {

    }
    
  }


  /*imprimit(){

    electron.ipcRenderer.send('print-ticket', {dateTicket:'25/04/231', numberTicket:'C201', tellerTicket:'C2', phraseTicket:'Frase fasdjf asldfj asdjf sadjf as kjhf ksdjhf kjadsfh ksaljfh kjsalhf  h kdshfksjadh kjshd kyhdkasjdh as kjsh kjfhksdf hsakdfh asjklfdh asklfdh klasjhf klasdhf kl kl flja', codeQrTicket:'facebook.comssss'})

   }*/

   openServerConfig(){

    electron.ipcRenderer.send('create-server-config', {dateTicket:'25/04/231', numberTicket:'2 PARAMETRO', categoryTicket:'CATEGORIA'})

   }

   fullScreen(){

    electron.ipcRenderer.send('full-screen', {dateTicket:'25/04/231', numberTicket:'2 PARAMETRO', categoryTicket:'CATEGORIA'})

   }

   printProofOfPayment(){
    electron.ipcRenderer.send('print-proof-of-payment-pdf', {dateTicket:'25/04/231', numberTicket:'2 PARAMETRO', categoryTicket:'CATEGORIA'})
   }




}