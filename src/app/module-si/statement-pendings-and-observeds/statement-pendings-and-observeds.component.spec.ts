import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementPendingsAndObservedsComponent } from './statement-pendings-and-observeds.component';

describe('StatementPendingsAndObservedsComponent', () => {
  let component: StatementPendingsAndObservedsComponent;
  let fixture: ComponentFixture<StatementPendingsAndObservedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementPendingsAndObservedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatementPendingsAndObservedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
