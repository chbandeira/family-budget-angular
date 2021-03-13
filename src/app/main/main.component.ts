import { MainChartService } from './main-chart/main-chart.service';
import { Component, OnInit } from '@angular/core';
import { ExpenseTableService } from '../expense/expense-table/expense-table.service';
import { IncomeTableService } from '../income/income-table/income-table.service';
import { MonthlyBalanceService } from '../monthly-balance/monthly-balance.service';
import { MonthConst } from '../shared/month-const';

@Component({
  selector: 'app-dashboard',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  currentDate!: Date;
  months = MonthConst.MONTHS;

  constructor(
    private mainChartService: MainChartService,
    private monthlyBalanceService: MonthlyBalanceService,
    private incomeTableService: IncomeTableService,
    private expenseTableService: ExpenseTableService) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.monthlyBalanceService.update(this.currentDate);
    this.mainChartService.update(this.currentDate);
  }

  /**
   * Go to the previous monthy
   * Update income and expense tables.
   */
  previous() {
    const previousDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    if (this.currentDate.getMonth() === 0) {
      previousDate.setMonth(11);
      previousDate.setFullYear(this.currentDate.getFullYear() -1);
    } else {
      previousDate.setMonth(this.currentDate.getMonth() -1);
    }
    this.currentDate = previousDate;
    this.incomeTableService.update(this.currentDate);
    this.expenseTableService.update(this.currentDate);
  }

  /**
   * Go to the next monthy.
   * Update income and expense tables.
   */
  next() {
    const nextDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    if (this.currentDate.getMonth() === 11) {
      nextDate.setMonth(0);
      nextDate.setFullYear(this.currentDate.getFullYear() +1);
    } else {
      nextDate.setMonth(this.currentDate.getMonth() +1);
    }
    this.currentDate = nextDate;
    this.incomeTableService.update(this.currentDate);
    this.expenseTableService.update(this.currentDate);
  }
}
