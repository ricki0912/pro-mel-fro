import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTellerComponent } from './assign-teller.component';

describe('AssignTellerComponent', () => {
  let component: AssignTellerComponent;
  let fixture: ComponentFixture<AssignTellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
