import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeServicesComponent } from './organize-services.component';

describe('OrganizeServicesComponent', () => {
  let component: OrganizeServicesComponent;
  let fixture: ComponentFixture<OrganizeServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizeServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
