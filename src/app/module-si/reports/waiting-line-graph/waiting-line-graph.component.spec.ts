import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingLineGraphComponent } from './waiting-line-graph.component';

describe('WaitingLineGraphComponent', () => {
  let component: WaitingLineGraphComponent;
  let fixture: ComponentFixture<WaitingLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingLineGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
