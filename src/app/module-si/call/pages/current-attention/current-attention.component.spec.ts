import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAttentionComponent } from './current-attention.component';

describe('CurrentAttentionComponent', () => {
  let component: CurrentAttentionComponent;
  let fixture: ComponentFixture<CurrentAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentAttentionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
