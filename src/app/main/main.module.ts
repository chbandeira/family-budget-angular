import { IncomeModule } from './../income/income.module';
import { ExpenseModule } from './../expense/expense.module';
import { ChartsModule } from 'ng2-charts';
import { DetailedMonthModule } from '../detailed-month/detailed-month.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { MainChartComponent } from './main-chart/main-chart.component';


@NgModule({
  declarations: [
    MainComponent,
    MainChartComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ChartsModule,
    DetailedMonthModule,
    IncomeModule,
    ExpenseModule
  ],
  exports: [
    MainComponent,
    MainChartComponent
  ]
})
export class MainModule { }
