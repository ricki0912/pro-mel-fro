import { TestBed } from '@angular/core/testing';

import { ServicesProvidedService } from './services-provided.service';

describe('ServicesProvidedService', () => {
  let service: ServicesProvidedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesProvidedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
