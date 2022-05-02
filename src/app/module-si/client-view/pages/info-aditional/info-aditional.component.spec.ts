import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAditionalComponent } from './info-aditional.component';

describe('InfoAditionalComponent', () => {
  let component: InfoAditionalComponent;
  let fixture: ComponentFixture<InfoAditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAditionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
