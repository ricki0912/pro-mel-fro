import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAfiliationComponent } from './info-afiliation.component';

describe('InfoAfiliationComponent', () => {
  let component: InfoAfiliationComponent;
  let fixture: ComponentFixture<InfoAfiliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAfiliationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAfiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
