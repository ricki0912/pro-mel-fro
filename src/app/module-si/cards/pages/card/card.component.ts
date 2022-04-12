import { Component, Input, OnInit } from '@angular/core';
import { Cards } from 'src/app/interfaces/cards';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Cards = {};
  longText = 'Holis bolis te meto mi trolis';
  constructor() { }

  ngOnInit(): void {
  }

}
