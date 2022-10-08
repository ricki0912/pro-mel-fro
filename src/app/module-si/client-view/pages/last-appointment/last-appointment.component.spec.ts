import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastAppointmentComponent } from './last-appointment.component';

describe('LastAppointmentComponent', () => {
  let component: LastAppointmentComponent;
  let fixture: ComponentFixture<LastAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
