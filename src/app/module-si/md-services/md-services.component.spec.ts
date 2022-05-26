import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdServicesComponent } from './md-services.component';

describe('MdServicesComponent', () => {
  let component: MdServicesComponent;
  let fixture: ComponentFixture<MdServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
