import { Component, OnInit } from '@angular/core';
import { multi } from './data-method-pay';

@Component({
  selector: 'app-grahp-pay-and-teller',
  templateUrl: './grahp-pay-and-teller.component.html',
  styleUrls: ['./grahp-pay-and-teller.component.scss']
})
export class GrahpPayAndTellerComponent implements OnInit {

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
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor( ) {
    Object.assign(this, { multi })
  }

  ngOnInit(): void {
  }

  onSelect(event:any) {
    console.log(event);
  }
}
