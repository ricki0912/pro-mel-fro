import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingGraphComponent } from './accounting-graph.component';

describe('AccountingGraphComponent', () => {
  let component: AccountingGraphComponent;
  let fixture: ComponentFixture<AccountingGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
