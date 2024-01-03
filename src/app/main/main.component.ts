import { MainChartService } from './main-chart/main-chart.service';
import { Component, OnInit } from '@angular/core';
import { ExpenseTableService } from '../expense/expense-table/expense-table.service';
import { IncomeTableService } from '../income/income-table/income-table.service';
import { BalanceService } from '../balance/balance.service';
import { MonthConst } from '../shared/month-const';

@Component({
  selector: 'app-dashboard',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  currentDate!: Date;
  months = MonthConst.MONTHS;
  monthlyBalance = 0.0;
  years: number[] = [];
  yearText?: string;

  constructor(
    private mainChartService: MainChartService,
    private balanceService: BalanceService,
    private incomeTableService: IncomeTableService,
    private expenseTableService: ExpenseTableService) { }

  ngOnInit(): void {
    for (let i = 2020; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }
    this.currentDate = new Date();
    this.updateChart();
  }

  private updateChart() {
    this.yearText = this.currentDate.getFullYear().toString();
    this.incomeTableService.update(this.currentDate);
    this.expenseTableService.update(this.currentDate);
    this.balanceService.update(this.currentDate);
    this.mainChartService.update(this.currentDate);
    this.mainChartService.barChartDataExpenseBehavior.subscribe(obj => {
      if (obj && obj.date) {
        this.currentDate = obj.date;
      };
    });
    this.mainChartService.barChartDataIncomeBehavior.subscribe(obj => {
      if (obj && obj.date) {
        this.currentDate = obj.date;
      };
    });
  }

  /**
   * Go to the previous monthy
   * Update income and expense tables.
   */
  previous() {
    const previousDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    if (this.currentDate.getMonth() === 0) {
      previousDate.setMonth(11);
      previousDate.setFullYear(this.currentDate.getFullYear() - 1);
    } else {
      previousDate.setMonth(this.currentDate.getMonth() - 1);
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
      nextDate.setFullYear(this.currentDate.getFullYear() + 1);
    } else {
      nextDate.setMonth(this.currentDate.getMonth() + 1);
    }
    this.currentDate = nextDate;
    this.incomeTableService.update(this.currentDate);
    this.expenseTableService.update(this.currentDate);
  }

  changeYear(year: number) {
    this.currentDate = new Date(year, 0);
    this.updateChart();
  }
}
