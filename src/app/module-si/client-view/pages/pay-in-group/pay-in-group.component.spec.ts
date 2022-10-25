import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayInGroupComponent } from './pay-in-group.component';

describe('PayInGroupComponent', () => {
  let component: PayInGroupComponent;
  let fixture: ComponentFixture<PayInGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayInGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayInGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
