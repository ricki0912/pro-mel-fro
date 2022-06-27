import { TestBed } from '@angular/core/testing';

import { TicketDispensingService } from './ticket-dispensing.service';

describe('TicketDispensingService', () => {
  let service: TicketDispensingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketDispensingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
