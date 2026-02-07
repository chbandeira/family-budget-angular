import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ExpenseService } from '../../expense/expense.service';
import { IncomeService } from '../../income/income.service';
import { transformMonthlyData } from '../../shared/helper/transform-data';

@Injectable({
  providedIn: 'root'
})
export class MainChartService {

  private barChartDataIncome: any;
  private barChartDataExpense: any;

  barChartDataIncomeBehavior : BehaviorSubject<any>;
  barChartDataExpenseBehavior : BehaviorSubject<any>;

  constructor(private incomeService: IncomeService, private expenseService: ExpenseService) {
    this.barChartDataIncomeBehavior = new BehaviorSubject(this.barChartDataIncome);
    this.barChartDataExpenseBehavior = new BehaviorSubject(this.barChartDataExpense);
  }

  update(date: Date) {
    this.expenseService.fetchSum(date.getFullYear()).subscribe((docs) => {
      const values = transformMonthlyData(docs.data);
      this.barChartDataExpenseBehavior.next({values: values, date: date});
    });
    this.incomeService.fetchSum(date.getFullYear()).subscribe((docs) => {
      console.log(docs.data);
      const values = transformMonthlyData(docs.data);
      this.barChartDataIncomeBehavior.next({values: values, date: date});
    });
  }
}
