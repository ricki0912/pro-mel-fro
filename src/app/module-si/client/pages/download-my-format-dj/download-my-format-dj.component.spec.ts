import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadMyFormatDJComponent } from './download-my-format-dj.component';

describe('DownloadMyFormatDJComponent', () => {
  let component: DownloadMyFormatDJComponent;
  let fixture: ComponentFixture<DownloadMyFormatDJComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadMyFormatDJComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadMyFormatDJComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
