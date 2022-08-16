import { TestBed } from '@angular/core/testing';

import { PreviewVideoService } from './preview-video.service';

describe('PreviewVideoService', () => {
  let service: PreviewVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviewVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
