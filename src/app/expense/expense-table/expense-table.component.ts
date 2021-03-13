import { Expense } from './../expense-model';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ExpenseService } from '../expense.service';
import { ExpenseTableService } from './expense-table.service';
import { MainService } from '../../main/main.service';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.scss']
})
export class ExpenseTableComponent implements OnInit {

  currentDate!: Date;

  expenses: any = [];
  totalExpenses = 0.0;
  item: any;
  tempItem = new Expense();

  constructor(
    private expenseTableService: ExpenseTableService,
    private mainService: MainService,
    private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.update(this.currentDate);
  }

  /**
   * Update expense table and total via behavior
   * @param date Date to update expense table and total
   */
  update(date: Date) {
    this.expenseTableService.expensesBehavior.subscribe(values => this.expenses = values);
    this.expenseTableService.totalExpensesBehavior.subscribe(value => this.totalExpenses = value);

    this.currentDate = date;
    this.expenseTableService.update(this.currentDate);
  }

  /**
   * Select a item to be deleted
   * @param item Expense to be deleted
   */
  itemToDelete(item: any) {
    this.item = item;
  }

  /**
   * Change item date in order to be formated
   * @param item Expense selected
   * @param event Event to get item's value
   */
  changeItemDate(item: any, event: any) {
    item.date = event.target.value;
  }

  /**
   * Copy expense item to a temporary object and set edition to true
   * @param item Expense seleted
   */
  editExpense(item: any) {
    Object.assign(this.tempItem, item);
    item.edit = true;
  }

  /**
   * Save new expense or update one
   * @param item Expense to be saved
   */
  saveExpense(item: any) {
    this.expenseService.save(item).subscribe();
    item.edit = !item.edit;
  }

  /**
   * Delete expense
   */
  deleteExpense(event: any) {
    this.expenseService.delete(this.item._id).pipe(
      finalize(() => {
        this.mainService.update(this.currentDate);
      })
    ).subscribe(() => this.item.edit = !this.item.edit);
  }

  /**
   * Copy expense item to a temporary object and set edition to false
   * @param item Expense
   */
  cancelExpenseChanges(item: any) {
    Object.assign(item, this.tempItem);
    item.edit = false;
  }

}
