import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnitPriceComponent } from './add-unit-price.component';

describe('AddAmountComponent', () => {
  let component: AddUnitPriceComponent;
  let fixture: ComponentFixture<AddUnitPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUnitPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUnitPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
