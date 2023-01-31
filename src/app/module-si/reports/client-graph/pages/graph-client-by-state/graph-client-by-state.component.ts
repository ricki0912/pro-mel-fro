import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { single } from '../data';
@Component({
  selector: 'app-graph-client-by-state',
  templateUrl: './graph-client-by-state.component.html',
  styleUrls: ['./graph-client-by-state.component.scss']
})
export class GraphClientByStateComponent implements OnInit {


  ngOnInit(): void {
    this.getData();
  }

  single: any[]=[];
  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme:any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private reportsServices:ReportsService,
    private datepipe: DatePipe,
  ) {
    /*Object.assign(this, { single });*/
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
    this.reportsServices.getClientByState().subscribe({
      next: d=>{
        console.log(d.data)
        this.single=d.data.results;
        //this.xAxisLabel=d.data.xAxisLabel;
        //this.yAxisLabel=d.data.yAxisLabel;
        //this.legendTitle=d.data.legendTitle;
      }, 
      error: e=>{
      
      }
    })
  }

}
