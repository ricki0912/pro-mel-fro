import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastPaymentByClientComponent } from './last-payment-by-client.component';

describe('LastPaymentByClientComponent', () => {
  let component: LastPaymentByClientComponent;
  let fixture: ComponentFixture<LastPaymentByClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastPaymentByClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastPaymentByClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
