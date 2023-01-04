import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { multi } from './data-method-pay';

@Component({
  selector: 'app-grahp-pay-and-teller',
  templateUrl: './grahp-pay-and-teller.component.html',
  styleUrls: ['./grahp-pay-and-teller.component.scss']
})
export class GrahpPayAndTellerComponent implements OnInit {
  dateStart:Date=new Date(new Date().getFullYear(), new Date().getMonth(),1)
  dateEnd:Date=new Date()


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
    //this.selectSearch()

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
      }, 
      error: e=>{
      
      }
    })



   
     //this.readCRUD(this.hqId, dateStart, dateEnd, this.wordlike)

  }
  exportExcel(){
    
  }
}
