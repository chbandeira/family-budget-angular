import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyBalanceComponent } from './monthly-balance.component';

describe('MonthlyBalanceComponent', () => {
  let component: MonthlyBalanceComponent;
  let fixture: ComponentFixture<MonthlyBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
