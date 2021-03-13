import { MonthlyBalanceService } from './../monthly-balance/monthly-balance.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Income } from './income-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeService } from './income.service';
import { finalize } from 'rxjs/operators';
import { IncomeTableService } from './income-table/income-table.service';
import { MainService } from '../main/main.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  @ViewChild('closeButton') closeButton: any;

  message = '';
  messageType = 'success';

  income = new Income();
  incomeForm!: FormGroup;

  categories = [
    'Charlles Salary',
    'Suellen Salary'
  ];

  constructor(
    private fb: FormBuilder,
    private incomeService: IncomeService,
    private mainService: MainService) { }

  ngOnInit(): void {
    this.message = '';
    this.incomeForm = this.fb.group({
      description: [this.income.description, Validators.required],
      category: [this.income.category, Validators.required],
      date: [this.income.date, Validators.required],
      value: [this.income.value, Validators.required]
    });
  }

  /**
   * Save new income
   */
  save() {
    if (this.incomeForm.valid) {
      this.incomeService.save(this.incomeForm.value).pipe(
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
