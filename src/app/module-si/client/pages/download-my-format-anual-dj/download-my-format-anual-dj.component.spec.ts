import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadMyFormatAnualDjComponent } from './download-my-format-anual-dj.component';

describe('DownloadMyFormatAnualDjComponent', () => {
  let component: DownloadMyFormatAnualDjComponent;
  let fixture: ComponentFixture<DownloadMyFormatAnualDjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadMyFormatAnualDjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadMyFormatAnualDjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
