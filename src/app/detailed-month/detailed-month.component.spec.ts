import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedMonthComponent } from './detailed-month.component';

describe('DetailedMonthComponent', () => {
  let component: DetailedMonthComponent;
  let fixture: ComponentFixture<DetailedMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
