import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingCardComponent } from './printing-card.component';

describe('PrintingCardComponent', () => {
  let component: PrintingCardComponent;
  let fixture: ComponentFixture<PrintingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
