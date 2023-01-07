import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-list-periods',
  templateUrl: './list-periods.component.html',
  styleUrls: ['./list-periods.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListPeriodsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
