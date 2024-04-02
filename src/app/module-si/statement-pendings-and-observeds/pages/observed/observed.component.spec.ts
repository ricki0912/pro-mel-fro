import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservedComponent } from './observed.component';

describe('ObservedComponent', () => {
  let component: ObservedComponent;
  let fixture: ComponentFixture<ObservedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
