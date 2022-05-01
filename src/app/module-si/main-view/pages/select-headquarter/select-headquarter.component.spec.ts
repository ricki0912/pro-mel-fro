import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHeadquarterComponent } from './select-headquarter.component';

describe('SelectHeadquarterComponent', () => {
  let component: SelectHeadquarterComponent;
  let fixture: ComponentFixture<SelectHeadquarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectHeadquarterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectHeadquarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
