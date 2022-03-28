import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalledComponent } from './called.component';

describe('CalledComponent', () => {
  let component: CalledComponent;
  let fixture: ComponentFixture<CalledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
