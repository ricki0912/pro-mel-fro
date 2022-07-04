import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintServerComponent } from './print-server.component';

describe('PrintServerComponent', () => {
  let component: PrintServerComponent;
  let fixture: ComponentFixture<PrintServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintServerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
