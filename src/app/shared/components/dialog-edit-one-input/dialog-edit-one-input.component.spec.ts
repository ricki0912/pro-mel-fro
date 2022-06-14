import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditOneInputComponent } from './dialog-edit-one-input.component';

describe('DialogEditOneInputComponent', () => {
  let component: DialogEditOneInputComponent;
  let fixture: ComponentFixture<DialogEditOneInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditOneInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditOneInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
