import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeRoutingModule } from './income-routing.module';
import { IncomeComponent } from './income.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncomeTableComponent } from './income-table/income-table.component';


@NgModule({
  declarations: [
    IncomeComponent,
    IncomeTableComponent
  ],
  imports: [
    CommonModule,
    IncomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    IncomeComponent,
    IncomeTableComponent
  ]
})
export class IncomeModule { }
