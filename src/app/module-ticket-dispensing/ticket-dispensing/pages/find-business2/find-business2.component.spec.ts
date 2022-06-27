import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBusiness2Component } from './find-business2.component';

describe('FindBusinessComponent', () => {
  let component: FindBusiness2Component;
  let fixture: ComponentFixture<FindBusiness2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindBusiness2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBusiness2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
