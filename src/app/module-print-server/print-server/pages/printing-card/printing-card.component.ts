import { Component, Input, OnInit } from '@angular/core';
import { SocketInterface, SOCKET_ACTION } from 'src/app/global/parents/socket.interface';
import { PrintServer,PRINT_SERVER_ANSWER_RESPONSE } from 'src/app/interfaces/print-server';
import { WaitingLineService } from 'src/app/socket/waiting-line.service';
declare var electron: any;

@Component({
  selector: 'app-printing-card',
  templateUrl: './printing-card.component.html',
  styleUrls: ['./printing-card.component.scss']
})
export class PrintingCardComponent implements OnInit {
  @Input() printServer?: PrintServer
  response={}
  responsD={}
  constructor(
    private _waitingLineService:WaitingLineService
  ) {

  }

  ngOnInit(): void {
    this.beforePrint()
    this.listenResponseClientPrint()
  }
  private listenResponseClientPrint(){
    electron.ipcRenderer.on('server:print-pdf-link', (e:any, p:any) => {
      if(!this.printServer)
        return

        this.printServer.psStateAnswer=p.stateAnwer;
        this.response=p
      if(p.stateAnwer==PRINT_SERVER_ANSWER_RESPONSE.DOWWLOADING){
          console.log("Descargando pdf", p);
          this.responsD=p
          let percent=(p.data.percent*100).toFixed(2)
          let transferredBytes=(p.data.transferredBytes/1000000).toFixed(2)
          let totalBytes=(p.data.totalBytes/1000000).toFixed()



          this.printServer.psMessage='Descargando archivo PDF. ('+percent+'%) '+transferredBytes+'MB de '+ totalBytes+'MB'
      }else if(p.stateAnwer==PRINT_SERVER_ANSWER_RESPONSE.DOWNLOADED){
        console.log("Descarga completada", p);
        this.printServer.psMessage='Descarga completada. Buscando impresora predeterminada.'

      }else if(p.stateAnwer==PRINT_SERVER_ANSWER_RESPONSE.DOWNLOAD_ERROR){
        console.log("Surgio erro al descargar ",p)
        this.printServer.psMessage='Al parecer surgio un error al intentar descargar el archivo PDF. Por favor selecciona una de las forma de impresión diferente.'+this.printServer.psUrl
      }else if(p.stateAnwer==PRINT_SERVER_ANSWER_RESPONSE.SEARCHING_PRINTER){
        console.log("Identificando impresosa", p)
        this.printServer.psMessage='Buscando impresora predeterminada.'
      }else if(p.stateAnwer==PRINT_SERVER_ANSWER_RESPONSE.SENDING_PRINT){
        console.log("Enviadnod a imprimir",p)
        this.printServer.psMessage='Enviando arhivo PDF a impresora.'
      }else if(p.stateAnwer==PRINT_SERVER_ANSWER_RESPONSE.PRINT_ERROR){
        console.log("Al parecer surgio un error al tratar de imprimir", p)
        this.printServer.psMessage='Al parecer surgio un error con la impresora. Verifica que este como predeterminada y encendida y que tenga papel suficiente.'
      }   
      let s:SocketInterface<PrintServer>={action: SOCKET_ACTION.RESPONSE_FROM_PRINT_SERVER, data:this.printServer}
      this._waitingLineService.setSocketPrintServer(this.printServer.hqId || -1, String(this.printServer.tellId), s )
                             
		})
  }
  
  private beforePrint(){
    if(this.printServer 
        && this.printServer.psStateAnswer==PRINT_SERVER_ANSWER_RESPONSE.PRINT_PENDING 
        && this.printServer.psUrl
        && this.printServer.psCopies
        && this.printServer.hqId 
        && this.printServer.tellId
        ){
          this.printServer.psMessage='En cola, pendiente de impresión. '
         console.log("Emprimiendo")
         let s:SocketInterface<PrintServer>={action: SOCKET_ACTION.RESPONSE_FROM_PRINT_SERVER, data:this.printServer}
         this._waitingLineService.setSocketPrintServer(this.printServer.hqId, String(this.printServer.tellId), s )
        this.printProofOfPayment(this.printServer.psUrl, this.printServer.psCopies)
    }
  }

//'http://api.melendresauditores.com/v1/payments/ysXgrbhW2ZJt12/proof-of-payment'
  private printProofOfPayment(url:string, copies:number){
    electron.ipcRenderer.send('client:print-pdf-link', {url: url, copies:copies})
   }

}

