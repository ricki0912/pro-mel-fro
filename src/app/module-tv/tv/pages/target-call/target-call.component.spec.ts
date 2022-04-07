import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetCallComponent } from './target-call.component';

describe('TargetCallComponent', () => {
  let component: TargetCallComponent;
  let fixture: ComponentFixture<TargetCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
