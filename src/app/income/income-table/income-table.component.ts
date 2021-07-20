import { Income } from './../income-model';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { IncomeService } from '../income.service';
import { IncomeTableService } from './income-table.service';
import { MainService } from '../../main/main.service';

@Component({
  selector: 'app-income-table',
  templateUrl: './income-table.component.html',
  styleUrls: ['./income-table.component.scss']
})
export class IncomeTableComponent implements OnInit {

  currentDate!: Date;

  incomes: any = [];
  totalIncome = 0.0;
  item: any;
  tempItem = new Income();

  constructor(
    private incomeTableService: IncomeTableService,
    private mainService: MainService,
    private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.update(this.currentDate);
  }

  /**
   * Update income table and total via behavior
   * @param date Date to update income table and total
   */
  update(date: Date) {
    this.incomeTableService.incomesBehavior.subscribe(values => this.incomes = values);
    this.incomeTableService.totalIncomeBehavior.subscribe(value => this.totalIncome = value);

    this.currentDate = date;
    this.incomeTableService.update(this.currentDate);
  }

  /**
   * Select a item to be deleted
   * @param item Income to be deleted
   */
  itemToDelete(item: any) {
    this.item = item;
  }

  /**
   * Change item date in order to be formated
   * @param item Income selected
   * @param event Event to get item's value
   */
  changeItemDate(item: any, event: any) {
    item.date = event.target.value;
  }

  /**
   * Copy income item to a temporary object and set edition to true
   * @param item Income seleted
   */
  editIncome(item: any) {
    Object.assign(this.tempItem, item);
    item.edit = true;
  }

  /**
   * Save new income or update one
   * @param item Income to be saved
   */
  saveIncome(item: any) {
    this.incomeService.save(item).pipe(
      finalize(() => {
        this.mainService.update(new Date(`${item.date}T12:00:00.000Z`));
      })
    ).subscribe(() => item.edit = !item.edit);
  }

  /**
   * Delete income
   */
  deleteIncome(event: any) {
    this.incomeService.delete(this.item._id).pipe(
      finalize(() => {
        this.mainService.update(new Date(`${this.item.date}T12:00:00.000Z`));
      })
    ).subscribe(() => this.item.edit = !this.item.edit);
  }

  /**
   * Copy income item to a temporary object and set edition to false
   * @param item Income
   */
  cancelIncomeChanges(item: any) {
    Object.assign(item, this.tempItem);
    item.edit = false;
  }

}
