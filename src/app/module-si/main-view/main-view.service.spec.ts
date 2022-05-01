import { TestBed } from '@angular/core/testing';

import { MainViewService } from './main-view.service';

describe('MainViewService', () => {
  let service: MainViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
