import { ExpenseService } from './../expense/expense.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { IncomeService } from '../income/income.service';

@Injectable({
  providedIn: 'root'
})
export class MonthlyBalanceService {
  private value = 0.0;
  balanceBehavior: BehaviorSubject<number>;

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
      this.expenseService.fetchSum(date.getFullYear(), date.getMonth())]
    ).subscribe(values => {
      const income = values[0].data.length > 0 ? values[0].data[0].total : 0;
      const expense = values[1].data.length > 0 ? values[1].data[0].total : 0;
      const total = income - expense;
      this.balanceBehavior.next(total);
    });
  }
}
