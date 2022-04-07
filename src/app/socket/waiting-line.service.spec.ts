import { TestBed } from '@angular/core/testing';

import { WaitingLineService } from './waiting-line.service';

describe('WaitingLineService', () => {
  let service: WaitingLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaitingLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
