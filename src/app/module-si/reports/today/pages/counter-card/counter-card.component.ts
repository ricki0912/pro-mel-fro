import { Component, Input, OnInit } from '@angular/core';
import { CounterCard } from 'src/app/interfaces/dashboard';

@Component({
  selector: 'app-counter-card',
  templateUrl: './counter-card.component.html',
  styleUrls: ['./counter-card.component.scss']
})
export class CounterCardComponent implements OnInit {
  @Input() counterCard?:CounterCard
  constructor() { }

  ngOnInit(): void {
    console.log("dentro",this.counterCard)
  }

}
