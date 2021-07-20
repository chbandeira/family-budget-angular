import { MainChartService } from './main-chart/main-chart.service';
import { Injectable } from '@angular/core';
import { ExpenseTableService } from '../expense/expense-table/expense-table.service';
import { BalanceService } from '../balance/balance.service';
import { IncomeTableService } from '../income/income-table/income-table.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private balanceService: BalanceService,
    private mainChartService: MainChartService,
    private expenseTableService: ExpenseTableService,
    private incomeTableService: IncomeTableService) { }

  /**
   * Update the following components:
   * MontlyBalance,
   * MainChart,
   * ExpenseTable,
   * IncomeTable.
   * @param date
   */
  update(date: Date) {
    this.balanceService.update(date);
    this.mainChartService.update(date);
    this.expenseTableService.update(date);
    this.incomeTableService.update(date);
  }
}
