import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStateAdvancedComponent } from './change-state-advanced.component';

describe('ChangeStateAdvancedComponent', () => {
  let component: ChangeStateAdvancedComponent;
  let fixture: ComponentFixture<ChangeStateAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeStateAdvancedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeStateAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
