import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphClientByStateComponent } from './graph-client-by-state.component';

describe('GraphClientByStateComponent', () => {
  let component: GraphClientByStateComponent;
  let fixture: ComponentFixture<GraphClientByStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphClientByStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphClientByStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
