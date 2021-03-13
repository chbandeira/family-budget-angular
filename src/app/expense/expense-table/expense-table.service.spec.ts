import { TestBed } from '@angular/core/testing';

import { ExpenseTableService } from './expense-table.service';

describe('ExpenseTableService', () => {
  let service: ExpenseTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
