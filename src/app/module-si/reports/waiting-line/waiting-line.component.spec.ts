import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingLineComponent } from './waiting-line.component';

describe('WaitingLineComponent', () => {
  let component: WaitingLineComponent;
  let fixture: ComponentFixture<WaitingLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
