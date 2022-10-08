import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrahpBussinesAndVisitorsComponent } from './grahp-bussines-and-visitors.component';

describe('GrahpBussinesAndVisitorsComponent', () => {
  let component: GrahpBussinesAndVisitorsComponent;
  let fixture: ComponentFixture<GrahpBussinesAndVisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrahpBussinesAndVisitorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrahpBussinesAndVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
