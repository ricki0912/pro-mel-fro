import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphTicketsByMonthComponent } from './graph-tickets-by-month.component';

describe('GraphTicketsByMonthComponent', () => {
  let component: GraphTicketsByMonthComponent;
  let fixture: ComponentFixture<GraphTicketsByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphTicketsByMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphTicketsByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
