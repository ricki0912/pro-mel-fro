import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDispensingComponent } from './ticket-dispensing.component';

describe('TicketDispensingComponent', () => {
  let component: TicketDispensingComponent;
  let fixture: ComponentFixture<TicketDispensingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketDispensingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDispensingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
