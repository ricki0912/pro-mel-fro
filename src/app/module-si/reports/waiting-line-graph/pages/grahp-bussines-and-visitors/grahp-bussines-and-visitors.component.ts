import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';

import { multi } from './data';

@Component({
  selector: 'app-grahp-bussines-and-visitors',
  templateUrl: './grahp-bussines-and-visitors.component.html',
  styleUrls: ['./grahp-bussines-and-visitors.component.scss']
})
export class GrahpBussinesAndVisitorsComponent implements OnInit {

  constructor(
    private reportsServices:ReportsService,
    

  ) {
    //Object.assign(this, { multi });
  }

  ngOnInit(): void {
    this.getData()
  }
  multi: any[]=[];
  view: [number, number]= [700, 300];
  

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme :any= {
    domain: ['#5AA454', '#E44D25']
  };



  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getData(){
    this.reportsServices.getAllBussinesAndVisitorsByDate().subscribe({
      next: d=>{
        console.log(d.data)
        this.multi=d.data;
      }, 
      error: e=>{
      
      }
    })
  }

}
