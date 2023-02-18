import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskByClientComponent } from './add-task-by-client.component';

describe('AddTaskByClientComponent', () => {
  let component: AddTaskByClientComponent;
  let fixture: ComponentFixture<AddTaskByClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskByClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskByClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
