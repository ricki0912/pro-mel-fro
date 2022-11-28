import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrahpPayAndTellerComponent } from './grahp-pay-and-teller.component';

describe('GrahpPayAndTellerComponent', () => {
  let component: GrahpPayAndTellerComponent;
  let fixture: ComponentFixture<GrahpPayAndTellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrahpPayAndTellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrahpPayAndTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
