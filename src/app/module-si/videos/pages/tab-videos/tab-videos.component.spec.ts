import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabVideosComponent } from './tab-videos.component';

describe('TabVideosComponent', () => {
  let component: TabVideosComponent;
  let fixture: ComponentFixture<TabVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
