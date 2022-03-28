import { TestBed } from '@angular/core/testing';

import { AppointmentTempService } from './appointment-temp.service';

describe('AppointmentTempService', () => {
  let service: AppointmentTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
