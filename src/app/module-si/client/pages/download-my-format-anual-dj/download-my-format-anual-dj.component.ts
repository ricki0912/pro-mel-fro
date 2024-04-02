import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { GlobalHelpers } from 'src/app/global/helpers/global.helpers';
import { BUSSINES_COLOR,DATA_BUSSINES_REGIME,BUSSINES_STATE, Bussines } from 'src/app/interfaces/bussines';
import { Period } from 'src/app/interfaces/period';
import { Teller } from 'src/app/interfaces/teller';
import { BussinesService } from 'src/app/services/bussines.service';
import { PeriodService } from 'src/app/services/period.service';
import { TellerService } from 'src/app/services/teller.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { environment } from 'src/environments/environment';
import * as fs from 'file-saver';


@Component({
  selector: 'app-download-my-format-anual-dj',
  templateUrl: './download-my-format-anual-dj.component.html',
  styleUrls: ['./download-my-format-anual-dj.component.scss']
})
export class DownloadMyFormatAnualDjComponent {
  loading: boolean = false;

  tellId: number | undefined;
  bussState: number = BUSSINES_STATE.ENABLE;
  prdsId: number = 0;
  month: number | undefined = MONTHS.find(
    (e) => e.id == GlobalHelpers.monthBefore().getMonth() + 1
  )?.id;

  MONTHS = MONTHS;
  BS = BUSSINES_STATE;

  public periods: Period[] = [];

  public tellers: Teller[]=[]
  //dataSource = new MatTableDataSource<Bussines>();


  title = 'Formato de Declaración Jurada Anual';
  constructor(
    private dialogRef: MatDialogRef<DownloadMyFormatAnualDjComponent>,
    private periodService: PeriodService,
    private showMessage: ShowMessageService,
    private tokenStorage: TokenStorageService, 
    private tellerService:TellerService,     
    private bussinesService: BussinesService,

  ) {
    this.tellId = this.tokenStorage.getTeller()?.tellId;
  }

  ngOnInit(): void {
    this.getDataPeriods();
    this.getDataTellers()
  }

  getColorBussState(bussState?: string) {
    switch (Number(bussState)) {
      case BUSSINES_STATE.ENABLE:
        return BUSSINES_COLOR.ENABLE;
      case BUSSINES_STATE.SUSPENDED:
        return BUSSINES_COLOR.SUSPENDED;
      case BUSSINES_STATE.RETIRED:
        return BUSSINES_COLOR.RETIRED;
      default:
        return '';
    }
  }

  public downloadFile() {
    //window.open(environment.API_URL+`/v1/reports/my-format-dj-json`, );
    let params = {
      tellId: this.tellId,
      bussState: this.bussState,
      prdsId: this.prdsId,
      month: this.month,
    };
    /*GlobalHelpers.openWindowWithPost(
      environment.API_URL + `/v1/reports/my-format-declaration`,
      params
    );*/
    this.readBusinessForDJAnual(this.prdsId, this.tellId ?? 0)
 
  }

  
  private getDataTellers(){
    this.tellerService.all().subscribe({
      next: e=>{
        this.tellers=e
      }, 
      error:e=>{

      }
    })
  }

  private getDataPeriods(): boolean {
    this.loading = true;
    this.periodService.all().subscribe({
      next: (data) => {
        this.periods = data.data as Period[];
        let period = this.periods.find(
          (e) =>
            Number(e.prdsNameShort) == GlobalHelpers.monthBefore().getFullYear()
        );
        this.prdsId = period?.prdsId || 0;

        this.loading = false;
      },
      error: (error) => {
        this.showMessage.error({
          message: 'Al parecer surgio un error!. ' + error.message.message,
        });
      },
    });
    return false;
  }

  readBusinessForDJAnual(prdsId:number, tellId:number): boolean {
    //this.isLoading = true;
    this.bussinesService.getBusinessForDJAnual(prdsId, tellId).subscribe({
      next: (r) => {
        console.log(r)
       this.exportExcel(r.data as Bussines[])
        //console.log("Data dentro de ticket",r)
        //this.isLoading = false;
        //this.dataSource.data = r.data as Bussines[];
        //this.selection.clear();
      },
      error: () => {
      }
    });
    return true;
  }


  private getNameBussState(bussState:number){
    let n='';


      switch (bussState) {
          case BUSSINES_STATE.ENABLE:
            n="Activo"
          break;
          case BUSSINES_STATE.RETIRED:
              n="Retirado"
              break;
          case BUSSINES_STATE.SUSPENDED:
              n="Suspendido"
              break;
          default:
              n=""
              break;
      }
      return n;

  }
  


  exportExcel(data:Bussines[]){
  
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Clientes Declaración Anual - Filtro");
  
    //CONVIRTIENDO NUESTRO ARREGLO A UN FORMATO LEGIBLE PARA EXCEL USANDO EXCELJS
    worksheet.addRow(undefined);
    for (let x1 of data){
        let x2=Object.keys(x1);
  
  
        
  
        let temp=[]
        temp.push(x1.bussFileNumber)
        temp.push(x1.bussRUC)
        temp.push(x1.bussName)
        temp.push(x1.bussTel)

       temp.push((x1.bussState)?this.getNameBussState(parseInt(x1.bussState)):null)
       temp.push(x1.bussStateDate)
       temp.push(DATA_BUSSINES_REGIME.find(e=>String(e.bussRegime)==x1.bussRegime)?.bussRegimeName)      

        
       temp.push((x1.tellId)?this.tellers.find(t => t.tellId === x1.tellId)?.tellCode:null)  
        //temp.push((x1.tellId)?this.findNameTeller(x1.tellId)?.tellName:null)
        

        //temp.push(x1.person.perTel)
        //temp.push(x1.person.perTel2)
        //temp.push(x1.person.perTel3)
        
        /*temp.push(this.getNameBussState(parseInt(x1.bussState)))
        temp.push((x1.tellId)?this.findNameTeller(x1.tellId)?.tellName:null)
        temp.push((x1.prdsId)?this.findNamePeriod(x1.prdsId)?.prdsNameShort:null)
        temp.push((x1.svId)?this.findNameService(x1.svId)?.svName:null)
        temp.push((x1.ppayId)?this.findNamePeriodPayment(x1.ppayId)?.ppayName:null)
        temp.push(x1.spCost)
        temp.push(x1.spPaid)
        temp.push(x1.spDebt)*/
  
        /*for(let y of x1.){
          temp.push(y)
        }*/
        worksheet.addRow(temp)
    }
    //NOMBRE DEL ARCHIVO RESULTANTE
    let temp=[]
     
    let fname="Clientes - Filtro";
    let keyCol=1
    //ASIGNACIÓN DE LA CABECERA DEL DOCUMENTO EXCEL DONDE CADA CAMPO DE LOS DATOS QUE EXPORTAREMOS SERA UNA COLUMNA
    worksheet.columns = [
        { header: 'ARCHIVADOR', key: 'col'+(keyCol++), width: 10},
        { header: 'RUC', key: 'col'+(keyCol++), width: 30},
        { header: 'NOMBRE', key: 'col'+(keyCol++), width: 15},
        { header: 'TELÉFONO CORPORATIVO', key: 'col'+(keyCol++), width: 15},

        { header: 'ESTADO CLIENTE', key: 'col'+(keyCol++), width: 15},
        { header: 'CAMBIO DE ESTADO', key: 'col'+(keyCol++), width: 15},
        { header: 'REGIMEN', key: 'col'+(keyCol++), width: 15},

        { header: '[VENTANILLA] CÓDIGO', key: 'col'+(keyCol++), width: 15},
        

        
        /*{ header: 'VENTANILLA ['+((this.t)?(this.findNameTeller(this.t)?.tellName):'Todos')+']', key: 'col'+(keyCol++), width: 20},
        { header: 'PERIODO ['+((this.p)?this.findNamePeriod(this.p)?.prdsNameShort:'Todos')+']', key: 'col'+(keyCol++), width: 20},
        { header: 'SERVICIO ['+((this.s)?this.findNameService(this.s)?.svName:'Todos')+']', key: 'col'+(keyCol++), width: 50},
        { header: 'MES/SUBPERIODO ['+((this.pp)?this.findNamePeriodPayment(this.pp)?.ppayName:'Todos')+']', key: 'col'+(keyCol++), width: 20},
        
        { header: 'COSTO', key: 'col'+(keyCol++), width: 20},
        { header: 'PAGADO', key: 'col'+(keyCol++), width: 20},
        { header: 'DEUDA', key: 'col'+(keyCol++), width: 20}*/
    ]as any;
  
    //PREPACION DEL ARCHIVO Y SU DESCARGA
    workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fname+'.xlsx');
    });
  
  }

}

export interface state {
  name: string;
  value: number;
}

interface Month {
  id: number;
  name: string;
}

const MONTHS: Month[] = [
  { id: 1, name: 'ENERO' },
  { id: 2, name: 'FEBRERO' },
  { id: 3, name: 'MARZO' },
  { id: 4, name: 'ABRIL' },
  { id: 5, name: 'MAYO' },
  { id: 6, name: 'JUNIO' },
  { id: 7, name: 'JULIO' },
  { id: 8, name: 'AGOSTO' },
  { id: 9, name: 'SETIEMBRE' },
  { id: 10, name: 'OCTUBRE' },
  { id: 11, name: 'NOVIEMBRE' },
  { id: 12, name: 'DICIEMBRE' },
];
