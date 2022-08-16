import { TestBed } from '@angular/core/testing';

import { VideosCService } from './videos-c.service';

describe('VideosService', () => {
  let service: VideosCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideosCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
