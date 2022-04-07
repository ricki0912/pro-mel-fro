import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCallComponent } from './comment-call.component';

describe('CommentCallComponent', () => {
  let component: CommentCallComponent;
  let fixture: ComponentFixture<CommentCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
