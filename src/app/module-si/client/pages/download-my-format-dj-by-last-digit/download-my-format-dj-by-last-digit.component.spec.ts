import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadMyFormatDjByLastDigitComponent } from './download-my-format-dj-by-last-digit.component';

describe('DownloadMyFormatDjByLastDigitComponent', () => {
  let component: DownloadMyFormatDjByLastDigitComponent;
  let fixture: ComponentFixture<DownloadMyFormatDjByLastDigitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadMyFormatDjByLastDigitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadMyFormatDjByLastDigitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
