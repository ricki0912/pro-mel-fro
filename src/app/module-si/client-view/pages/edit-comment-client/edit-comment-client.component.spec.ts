import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommentClientComponent } from './edit-comment-client.component';

describe('EditCommentClientComponent', () => {
  let component: EditCommentClientComponent;
  let fixture: ComponentFixture<EditCommentClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCommentClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommentClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
