import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGraphComponent } from './client-graph.component';

describe('ClientGraphComponent', () => {
  let component: ClientGraphComponent;
  let fixture: ComponentFixture<ClientGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
