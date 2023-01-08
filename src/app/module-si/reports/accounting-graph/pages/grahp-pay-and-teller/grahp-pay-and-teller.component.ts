import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import { ReportsService } from 'src/app/services/reports.service';
import { multi } from './data-method-pay';
import * as fs from 'file-saver';

@Component({
  selector: 'app-grahp-pay-and-teller',
  templateUrl: './grahp-pay-and-teller.component.html',
  styleUrls: ['./grahp-pay-and-teller.component.scss']
})
export class GrahpPayAndTellerComponent implements OnInit {
  dateStart:Date=new Date(new Date().getFullYear(), new Date().getMonth(),1)
  dateEnd:Date=new Date()


  data:any[]=[]
  multi: any[]=[];
  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  animations: boolean = true;

  colorScheme: any = {
    domain: [
              "#7c9fb0",    "#5698c4",    "#9abf88",
              "#993767",    "#65387d",    "#4e2472",
              "#9163b6",    "#e279a3",    "#e0598b",
              "#51574a",    "#447c69",    "#74c493",
              "#8e8c6d",    "#e4bf80",    "#e9d78e",
              "#e2975d",    "#f19670",    "#e16552",
              "#c94a53",    "#be5168",    "#a34974",
    ]
  };

  constructor( 
    private reportsServices:ReportsService,
    private datepipe: DatePipe,


  ) {
    Object.assign(this, { multi })
  }

  ngOnInit(): void {
    this.selectSearch()

  }

  onSelect(event:any) {
    console.log(event);
  }

  /*getData(){
    this.reportsServices.getPaymentsMethodsByTeller().subscribe({
      next: d=>{
        console.log(d.data)
        this.multi=d.data.results;
        this.xAxisLabel=d.data.xAxisLabel;
        this.yAxisLabel=d.data.yAxisLabel;
      }, 
      error: e=>{
      
      }
    })
  }*/

  selectSearch(){
    let  dateStart = this.datepipe.transform(this.dateStart, 'yyyy/MM/dd') || '';
    let dateEnd = this.datepipe.transform(this.dateEnd, 'yyyy/MM/dd') || '';
   
    this.reportsServices.getPaymentsMethodsByTeller(dateStart, dateEnd).subscribe({
      next: d=>{
        console.log(d.data)
        this.multi=d.data.results;
        this.xAxisLabel=d.data.xAxisLabel;
        this.yAxisLabel=d.data.yAxisLabel;
        this.data=d.data.data;
      }, 
      error: e=>{
      
      }
    })



   
     //this.readCRUD(this.hqId, dateStart, dateEnd, this.wordlike)

  }

  exportExcel(){
   
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet("Hoja 01");

  //CONVIRTIENDO NUESTRO ARREGLO A UN FORMATO LEGIBLE PARA EXCEL USANDO EXCELJS
  worksheet.addRow(undefined);
  for (let x1 of this.data){
      let x2=Object.keys(x1);

      let temp=[]
      temp.push(x1.tellName)
      temp.push(x1.paymthdsName)
      temp.push(x1.total)

      

      
      /*for(let y of x1.){
        temp.push(y)
      }*/
      worksheet.addRow(temp)
  }
  //NOMBRE DEL ARCHIVO RESULTANTE
  let fname="Pagos por Metodo y  ventanilla";

  //ASIGNACIÓN DE LA CABECERA DEL DOCUMENTO EXCEL DONDE CADA CAMPO DE LOS DATOS QUE EXPORTAREMOS SERA UNA COLUMNA
  worksheet.columns = [
      { header: 'Ventanilla', key: 'col1', width: 10},
      { header: 'Metodo de Pago', key: 'col2', width: 30},
      { header: 'Total', key: 'col3', width: 15},
      
  ]as any;

  //PREPACION DEL ARCHIVO Y SU DESCARGA
  workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'.xlsx');
  }); 
  }
}
