import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMainControlComponent } from './tab-main-control.component';

describe('TabMainControlComponent', () => {
  let component: TabMainControlComponent;
  let fixture: ComponentFixture<TabMainControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabMainControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabMainControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
