import { TestBed } from '@angular/core/testing';

import { PeriodPaymentService } from './period-payment.service';

describe('PeriodPaymentService', () => {
  let service: PeriodPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
