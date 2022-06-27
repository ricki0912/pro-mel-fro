import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardAlphabetComponent } from './keyboard-alphabet.component';

describe('KeyboardAlphabetComponent', () => {
  let component: KeyboardAlphabetComponent;
  let fixture: ComponentFixture<KeyboardAlphabetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyboardAlphabetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardAlphabetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
