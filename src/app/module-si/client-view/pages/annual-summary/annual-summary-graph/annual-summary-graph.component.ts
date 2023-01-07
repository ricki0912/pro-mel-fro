import { Component } from '@angular/core';
import { multi } from 'src/app/module-si/client-view/pages/annual-summary/annual-summary-graph/data';

@Component({
  selector: 'app-annual-summary-graph',
  templateUrl: './annual-summary-graph.component.html',
  styleUrls: ['./annual-summary-graph.component.scss'],
})
export class AnnualSummaryGraphComponent {
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

  constructor() {
    Object.assign(this, { multi });
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
}
