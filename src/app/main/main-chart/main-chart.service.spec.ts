import { TestBed } from '@angular/core/testing';

import { MainChartService } from './main-chart.service';

describe('MainChartService', () => {
  let service: MainChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
