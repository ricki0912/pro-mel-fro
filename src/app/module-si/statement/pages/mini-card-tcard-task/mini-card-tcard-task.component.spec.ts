import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCardTcardTaskComponent } from './mini-card-tcard-task.component';

describe('MiniCardTcardTaskComponent', () => {
  let component: MiniCardTcardTaskComponent;
  let fixture: ComponentFixture<MiniCardTcardTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniCardTcardTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniCardTcardTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
