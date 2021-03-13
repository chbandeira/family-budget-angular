import { TestBed } from '@angular/core/testing';

import { IncomeTableService } from './income-table.service';

describe('IncomeTableService', () => {
  let service: IncomeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
