import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTicketDispensingComponent } from './tab-ticket-dispensing.component';

describe('TabTicketDispensingComponent', () => {
  let component: TabTicketDispensingComponent;
  let fixture: ComponentFixture<TabTicketDispensingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabTicketDispensingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabTicketDispensingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
