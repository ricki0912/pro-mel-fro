import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtsAndPaidsComponent } from './debts-and-paids.component';

describe('DebtsAndPaidsComponent', () => {
  let component: DebtsAndPaidsComponent;
  let fixture: ComponentFixture<DebtsAndPaidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtsAndPaidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtsAndPaidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
