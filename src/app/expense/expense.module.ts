import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseComponent } from './expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ExpenseTableComponent } from './expense-table/expense-table.component';


@NgModule({
  declarations: [
    ExpenseComponent,
    ExpenseTableComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ExpenseComponent,
    ExpenseTableComponent
  ]
})
export class ExpenseModule { }
