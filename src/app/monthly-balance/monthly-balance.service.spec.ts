import { TestBed } from '@angular/core/testing';

import { MonthlyBalanceService } from './monthly-balance.service';

describe('MonthlyBalanceService', () => {
  let service: MonthlyBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
