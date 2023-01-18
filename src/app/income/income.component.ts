import { Component, OnInit, ViewChild } from '@angular/core';
import { Income } from './income-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeService } from './income.service';
import { finalize } from 'rxjs/operators';
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

  // TODO this can be moved to DB
  categories = [
    'Person 1 Salary',
    'Person 2 Salary',
    'Person 1 Extra',
    'Person 2 Extra'
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
          this.mainService.update(new Date(`${this.incomeForm.value.date}T12:00:00.000Z`));
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
