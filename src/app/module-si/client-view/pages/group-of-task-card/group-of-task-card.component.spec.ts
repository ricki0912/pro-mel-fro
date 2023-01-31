import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupOfTaskCardComponent } from './group-of-task-card.component';

describe('GroupOfTaskCardComponent', () => {
  let component: GroupOfTaskCardComponent;
  let fixture: ComponentFixture<GroupOfTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupOfTaskCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupOfTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
