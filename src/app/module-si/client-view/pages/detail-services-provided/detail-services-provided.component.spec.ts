import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailServicesProvidedComponent } from './detail-services-provided.component';

describe('DetailServicesProvidedComponent', () => {
  let component: DetailServicesProvidedComponent;
  let fixture: ComponentFixture<DetailServicesProvidedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailServicesProvidedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailServicesProvidedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
