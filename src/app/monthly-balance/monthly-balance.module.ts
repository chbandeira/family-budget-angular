import { MonthlyBalanceService } from './monthly-balance.service';
import { IncomeModule } from './../income/income.module';
import { ExpenseModule } from './../expense/expense.module';
import { MonthlyBalanceComponent } from './monthly-balance.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [MonthlyBalanceComponent],
  imports: [
    CommonModule,
    ExpenseModule,
    IncomeModule
  ],
  exports: [MonthlyBalanceComponent]
})
export class MonthlyBalanceModule { }
