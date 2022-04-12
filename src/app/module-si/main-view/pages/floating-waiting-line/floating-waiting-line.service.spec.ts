import { TestBed } from '@angular/core/testing';
import { FloatingWaitingLineService } from './floating-waiting-line.service';

//import { FloatingWaitingLineService } from '../floating-waiting-line.service';
FloatingWaitingLineService

describe('FloatingWaitingLineService', () => {
  let service: FloatingWaitingLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloatingWaitingLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
