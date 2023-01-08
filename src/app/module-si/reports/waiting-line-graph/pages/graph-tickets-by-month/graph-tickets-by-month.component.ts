import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { multi } from './data';

@Component({
  selector: 'app-graph-tickets-by-month',
  templateUrl: './graph-tickets-by-month.component.html',
  styleUrls: ['./graph-tickets-by-month.component.scss']
})
export class GraphTicketsByMonthComponent implements OnInit {


  ngOnInit(): void {
    this.getData()
  }

  multi: any[]=[];
  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';

  colorScheme:any = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private reportsServices:ReportsService,
    private datepipe: DatePipe,

  ) {
    Object.assign(this, { multi })
  }

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
    this.reportsServices.getTicketsByMonth().subscribe({
      next: d=>{
        console.log(d.data)
        this.multi=d.data.results;
        this.xAxisLabel=d.data.xAxisLabel;
        this.yAxisLabel=d.data.yAxisLabel;
        this.legendTitle=d.data.legendTitle;
      }, 
      error: e=>{
      
      }
    })
  }


}
