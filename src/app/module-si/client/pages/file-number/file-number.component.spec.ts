import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileNumberComponent } from './file-number.component';

describe('FileNumberComponent', () => {
  let component: FileNumberComponent;
  let fixture: ComponentFixture<FileNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
