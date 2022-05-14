import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsMigrationComponent } from './tickets-migration.component';

describe('TicketsMigrationComponent', () => {
  let component: TicketsMigrationComponent;
  let fixture: ComponentFixture<TicketsMigrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsMigrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsMigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
