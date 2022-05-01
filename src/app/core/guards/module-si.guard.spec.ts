import { TestBed } from '@angular/core/testing';

import { ModuleSiGuard } from './module-si.guard';

describe('ModuleSiGuard', () => {
  let guard: ModuleSiGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ModuleSiGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
