import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldDebtByClientComponent } from './old-debt-by-client.component';

describe('OldDebtByClientComponent', () => {
  let component: OldDebtByClientComponent;
  let fixture: ComponentFixture<OldDebtByClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldDebtByClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldDebtByClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
