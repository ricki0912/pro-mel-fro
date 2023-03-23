import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAndObservedComponent } from './pending-and-observed.component';

describe('PendingAndObservedComponent', () => {
  let component: PendingAndObservedComponent;
  let fixture: ComponentFixture<PendingAndObservedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingAndObservedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingAndObservedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
