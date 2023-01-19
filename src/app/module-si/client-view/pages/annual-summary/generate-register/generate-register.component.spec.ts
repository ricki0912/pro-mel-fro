import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateRegisterComponent } from './generate-register.component';

describe('GenerateRegisterComponent', () => {
  let component: GenerateRegisterComponent;
  let fixture: ComponentFixture<GenerateRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
