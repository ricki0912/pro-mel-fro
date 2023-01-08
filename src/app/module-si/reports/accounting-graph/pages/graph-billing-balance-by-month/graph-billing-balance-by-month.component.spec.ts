import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphBillingBalanceByMonthComponent } from './graph-billing-balance-by-month.component';

describe('GraphBillingBalanceByMonthComponent', () => {
  let component: GraphBillingBalanceByMonthComponent;
  let fixture: ComponentFixture<GraphBillingBalanceByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphBillingBalanceByMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphBillingBalanceByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
