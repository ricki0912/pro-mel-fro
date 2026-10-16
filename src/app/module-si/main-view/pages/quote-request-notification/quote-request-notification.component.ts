import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, exhaustMap, Subject, takeUntil, timer } from 'rxjs';
import { QUOTE_REQUESTS_STATE } from 'src/app/interfaces/quote-request';
import { QuoteRequestService } from 'src/app/services/quote-request.service';

@Component({
  selector: 'app-quote-request-notification',
  templateUrl: './quote-request-notification.component.html',
  styleUrls: ['./quote-request-notification.component.scss']
})
export class QuoteRequestNotificationComponent implements OnInit {
  private destroy$ = new Subject<void>();

  cantQuoteRequestsAsPending:number=0
  constructor(

    private quoteRequestService: QuoteRequestService
  ) { }
  ngOnInit(): void {

    this.readCantQuoteRequests()
  }

  /*private readCantQuoteRequests(){
   this.quoteRequestService.getCountByState(QUOTE_REQUESTS_STATE.PENDING).subscribe({
    next: d=>{
      this.cantQuoteRequestsAsPending=d.data as number
    }
   })
  }*/

  private readCantQuoteRequests(): void {
  timer(0, 15000).pipe(
    exhaustMap(() =>
      this.quoteRequestService
        .getCountByState(QUOTE_REQUESTS_STATE.PENDING)
        .pipe(
          catchError(() => EMPTY)
        )
    ),
    takeUntil(this.destroy$)
  ).subscribe({
    next: d => {
      this.cantQuoteRequestsAsPending = d.data as number;
    }
  });
}



ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}


}
