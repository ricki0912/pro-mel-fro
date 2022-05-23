import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPeriodComponent } from './find-period.component';

describe('FindPeriodComponent', () => {
  let component: FindPeriodComponent;
  let fixture: ComponentFixture<FindPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
