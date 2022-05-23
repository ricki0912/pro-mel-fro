import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAmountComponent } from './add-amount.component';

describe('AddAmountComponent', () => {
  let component: AddAmountComponent;
  let fixture: ComponentFixture<AddAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
