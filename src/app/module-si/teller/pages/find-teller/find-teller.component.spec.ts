import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTellerComponent } from './find-teller.component';

describe('FindTellerComponent', () => {
  let component: FindTellerComponent;
  let fixture: ComponentFixture<FindTellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindTellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
