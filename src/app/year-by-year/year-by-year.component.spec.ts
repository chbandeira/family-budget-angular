import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearByYearComponent } from './year-by-year.component';

describe('YearByYearComponent', () => {
  let component: YearByYearComponent;
  let fixture: ComponentFixture<YearByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearByYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
