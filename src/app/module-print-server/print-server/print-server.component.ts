import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketInterface, SOCKET_ACTION } from 'src/app/global/parents/socket.interface';
import { PrintServer } from 'src/app/interfaces/print-server';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { WaitingLineService } from 'src/app/socket/waiting-line.service';

@Component({
  selector: 'app-print-server',
  templateUrl: './print-server.component.html',
  styleUrls: ['./print-server.component.scss']
})
export class PrintServerComponent implements OnInit {
  
  printServers:PrintServer[]=[]
  hqId:number=0
  constructor(
    private _loadingService:LoadingService,
    private _activatedRouted:ActivatedRoute,
    private _waitingLineService: WaitingLineService


  ) { }

  ngOnInit(): void {
    this._loadingService.stop()
    this.listenRoute((e)=>{this.getSocketPrinterServer(e, "IMPRESORA 01")})
  }

  private listenRoute(c:(o:any)=>void){
    this._activatedRouted.params.subscribe(params=>{

      this.hqId=parseInt(params['hqId'] || 0)
      c(this.hqId)
    });
  }

  private getSocketPrinterServer(hqId:number, token:string){
    this._waitingLineService.getSocketPrintServer(hqId, token).subscribe({
      next: (d)=>{
        if(d.action==SOCKET_ACTION.SEND_PDF_LINK_TO_PRINTER){
          console.log("GET_PDF_LINK", d)
          this.printServers.unshift(d.data as PrintServer)
        }else if(d.action==SOCKET_ACTION.PRINTER_IS_ENABLE){
          console.log("TEST_PRINTER_ENABLE", d)
          let ps=d.data as PrintServer
          if(ps.tellId)
          this._waitingLineService.setSocketPrintServer(hqId, ps.tellId?.toString(), {action: SOCKET_ACTION.PRINTER_READY_TO_PRINT, data:null} )
        }
        
      }, error: (e)=>{
        console.log("SURGIO UN ERROR", e)
      }
    })
  }


  emit(printServer:PrintServer){
    let si:SocketInterface<any>={action:SOCKET_ACTION.SEND_PDF_LINK_TO_PRINTER, data:null}
    this._waitingLineService.setSocketPrintServer(1, "Hola",si);
  }


}

