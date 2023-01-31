import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBussPeriodsComponent } from './list-tasks-completed.component';

describe('ListBussPeriodsComponent', () => {
  let component: ListBussPeriodsComponent;
  let fixture: ComponentFixture<ListBussPeriodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBussPeriodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBussPeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
