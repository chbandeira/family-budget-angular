import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExpenseService } from '../expense.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTableService {

  private expenses: any = [];
  private totalExpenses = 0.0;
  expensesBehavior: BehaviorSubject<any[]>;
  totalExpensesBehavior: BehaviorSubject<number>;

  constructor(private expenseService: ExpenseService) {
    this.expensesBehavior = new BehaviorSubject(this.expenses);
    this.totalExpensesBehavior = new BehaviorSubject(this.totalExpenses);
  }

  update(date: Date) {
    this.totalExpenses = 0.0;
    this.expenseService.fetch(date.getFullYear(), date.getMonth()).subscribe(docs => {
      this.expenses = docs.data;
      this.expenses.forEach((doc: any) => {
        this.totalExpenses += doc.value;
        doc.date = doc.date.split('T')[0]; //remove timezone
      });

      this.expensesBehavior.next(this.expenses);
      this.totalExpensesBehavior.next(this.totalExpenses);
    });
  }
}
