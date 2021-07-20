import { ExpenseService } from './../expense/expense.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { IncomeService } from '../income/income.service';

@Injectable({
  providedIn: 'root'
})
export class MonthlyBalanceService {
  private value = 0.0;
  balanceBehavior: BehaviorSubject<any>;

  constructor(private incomeService: IncomeService, private expenseService: ExpenseService) {
    this.balanceBehavior = new BehaviorSubject(this.value);
  }

  /**
   * Update monthly balance with income minus expense
   * @param date Date selected
   */
  update(date: Date) {
    combineLatest([
      this.incomeService.fetchSum(date.getFullYear(), date.getMonth()),
      this.expenseService.fetchSum(date.getFullYear(), date.getMonth()),
      this.incomeService.fetchSum(date.getFullYear()),
      this.expenseService.fetchSum(date.getFullYear())]
    ).subscribe(values => {
      const monthlyIncome = values[0].data.length > 0 ? values[0].data[0].total : 0;
      const monthlyExpenses = values[1].data.length > 0 ? values[1].data[0].total : 0;
      const annualIncome = values[2].data.length > 0 ? values[2].data
        .map((income: any) => income.total)
        .reduce((accumulator: number, currentValue: number) => accumulator + currentValue) : 0;
      const annualExpenses = values[3].data.length > 0 ? values[3].data
        .map((expense: any) => expense.total)
        .reduce((accumulator: number, currentValue: number) => accumulator + currentValue) : 0;

      let numberOfMonths = values[2].data.length > values[3].data.length ? values[2].data.length : values[3].data.length;
      numberOfMonths = numberOfMonths > 0 ? numberOfMonths : 1; // avoid division by 0

      const monthlyBalance = monthlyIncome - monthlyExpenses;
      const annualBalance = annualIncome - annualExpenses;
      const expensesAverage = annualExpenses / numberOfMonths;
      const incomeAverage = annualIncome / numberOfMonths;

      this.balanceBehavior.next({
        monthlyBalance: monthlyBalance,
        annualBalance: annualBalance,
        expensesAverage: expensesAverage,
        incomeAverage: incomeAverage
      });
    });
  }
}
