import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingWaitingLineComponent } from './floating-waiting-line.component';

describe('FloatingWaitingLineComponent', () => {
  let component: FloatingWaitingLineComponent;
  let fixture: ComponentFixture<FloatingWaitingLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingWaitingLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingWaitingLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
