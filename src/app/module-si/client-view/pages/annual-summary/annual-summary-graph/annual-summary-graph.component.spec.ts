import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualSummaryGraphComponent } from './annual-summary-graph.component';

describe('AnnualSummaryGraphComponent', () => {
  let component: AnnualSummaryGraphComponent;
  let fixture: ComponentFixture<AnnualSummaryGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualSummaryGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualSummaryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
