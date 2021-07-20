import { IncomeModule } from '../income/income.module';
import { ExpenseModule } from '../expense/expense.module';
import { BalanceComponent } from './balance.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [BalanceComponent],
  imports: [
    CommonModule,
    ExpenseModule,
    IncomeModule
  ],
  exports: [BalanceComponent]
})
export class BalanceModule { }
