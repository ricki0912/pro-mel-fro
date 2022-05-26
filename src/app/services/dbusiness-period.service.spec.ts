import { TestBed } from '@angular/core/testing';

import { DBusinessPeriodService } from './dbusiness-period.service';

describe('DBusinessPeriodService', () => {
  let service: DBusinessPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DBusinessPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
