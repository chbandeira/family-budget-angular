import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from './expense-model';
import { ExpenseService } from './expense.service';
import { finalize } from 'rxjs/operators';
import { MainService } from '../main/main.service';
import { CategoryConst } from '../shared/category-const';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  @ViewChild('closeButton') closeButton: any;

  message = '';
  messageType = 'success';

  expense = new Expense();
  expenseForm!: FormGroup;

  categories = CategoryConst.LIST;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private mainService: MainService) { }

  ngOnInit(): void {
    this.message = '';
    this.expenseForm = this.fb.group({
      description: [this.expense.description, Validators.required],
      category: [this.expense.category, Validators.required],
      date: [this.expense.date, Validators.required],
      value: [this.expense.value, Validators.required],
      credit: [this.expense.credit]
    });
  }

  /**
   * Save new expense
   */
  save() {
    if (this.expenseForm.valid) {
      this.expenseService.save(this.expenseForm.value).pipe(
        finalize(() => {
          this.mainService.update(new Date());
          this.closeButton.nativeElement.click();
        })
      ).subscribe(res =>
        this.message = res.message
      );
    } else {
      this.message = 'Fields required.'
      this.messageType = 'error';
    }
  }

}
