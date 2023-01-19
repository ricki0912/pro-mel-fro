import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Period } from 'src/app/interfaces/period';
import { PeriodService } from 'src/app/services/period.service';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-list-periods',
  templateUrl: './list-periods.component.html',
  styleUrls: ['./list-periods.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListPeriodsComponent implements OnInit {
  @Output() onPeriod = new EventEmitter<Period>();
  periodSelected?:Period=undefined
  setPeriod(period: Period) {
    this.periodSelected=period;
    this.onPeriod.emit(this.periodSelected);
  }

  public periods:Period[]=[]
  constructor(
    private periodService: PeriodService,

  ) {

  }

  ngOnInit(): void {
    this.getDataPeriods()
  }

  getDataPeriods(): boolean {
    
    this.periodService.all().subscribe({
      next: data => {
        this.periods = data.data as Period[];
        
      },
      error: error => {
       // this.isLoading = false
      }
    })
    return false;
  }
}
