import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTellerComponent } from './card-teller.component';

describe('CardTellerComponent', () => {
  let component: CardTellerComponent;
  let fixture: ComponentFixture<CardTellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
