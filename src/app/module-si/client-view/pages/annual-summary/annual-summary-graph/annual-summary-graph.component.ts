import { Component, Input } from '@angular/core';
import { multi } from 'src/app/module-si/client-view/pages/annual-summary/annual-summary-graph/data';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-annual-summary-graph',
  templateUrl: './annual-summary-graph.component.html',
  styleUrls: ['./annual-summary-graph.component.scss'],
})
export class AnnualSummaryGraphComponent {
  private _bussId?:number=undefined;
  private _prdsIdPrevious?:number=undefined;
  private _prdsIdCurrent?:number=undefined;

  @Input() public set bussId(v:number| undefined){
    this._bussId=v
    this.before();
  } 

  @Input() public set prdsIdPrevious(v: number | undefined){
    this._prdsIdPrevious=v;
    this.before();
  }

  @Input() public set prdsIdCurrent(v:number| undefined){
    this._prdsIdCurrent=v
    this.before();
  }

  multi: any[] = [];

  // options
  legendPosition: any = 'right';
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

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(
    private reportsServices:ReportsService,

  ) {
//    Object.assign(this, { multi });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  ngOnInit(): void {
  }
private before(){
 if(this._bussId && this._prdsIdPrevious && this._prdsIdCurrent){
  this.getData(this._bussId, this._prdsIdPrevious, this._prdsIdCurrent);
 }else {
  this.multi=[]
 }

}

  private  getData(bussId:number, prdsIdPrevious:number, prdsIdCurrent:number){
    this.reportsServices.getAnnualResumeByMonth(bussId, prdsIdPrevious, prdsIdCurrent).subscribe({
      next: d=>{
        console.log(d.data)
        this.multi=d.data.results;
        //this.xAxisLabel=d.data.xAxisLabel;
        //this.yAxisLabel=d.data.yAxisLabel;
        //this.legendTitle=d.data.legendTitle;
      }, 
      error: e=>{
      
      }
    })
  }
}
