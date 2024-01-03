import { combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense/expense.service';
import { IncomeService } from '../income/income.service';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { NumberFormatter } from '../shared/number-formarter';
import { MonthConst } from '../shared/month-const';
import { CategoryConst } from '../shared/category-const';
import { Expense } from '../expense/expense-model';

@Component({
  selector: 'app-detailed-month',
  templateUrl: './detailed-month.component.html',
  styleUrls: ['./detailed-month.component.scss']
})
export class DetailedMonthComponent implements OnInit {
  currentDate!: Date;
  years: number[] = [];
  yearText?: string;

  barChartOptions: ChartOptions;
  barChartLabels: Label[];
  barChartType: ChartType;
  barChartLegend: boolean;
  barChartPlugins: any;
  barChartData: ChartDataSets[];

  balance = 0.0;
  expense = 0.0;
  income = 0.0;
  month = 0;
  months = MonthConst.MONTHS;

  categories = new Array(5);

  constructor(
    private incomeService: IncomeService,
    private expenseService: ExpenseService,
    private route: ActivatedRoute) {
    this.currentDate = new Date();
    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{}], yAxes: [{
          ticks: {
            suggestedMin: 0,
            suggestedMax: 20,
            callback: function (value, index, values) {
              return NumberFormatter.format(Number(value));
            }
          }
        }]
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
          display: true,
          formatter: function (value) {
            return NumberFormatter.format(value);
          }
        }
      },
      title: {
        display: true,
        text: ''
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem: any, data: any) {
            const label = data.datasets[tooltipItem.datasetIndex].label;
            const dataValue = NumberFormatter.format(Number(data.datasets[tooltipItem.datasetIndex].data[0]));
            return ` ${label} ${dataValue}`;
          }
        },
      },
      legend: {
        position: 'bottom'
      }
    };
    this.barChartLabels = [''];
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = [ChartDataLabels];

    this.barChartData = [];
    for (let i = 0; i < CategoryConst.GROUP.length; i++) {
      const category = CategoryConst.GROUP[i];
      this.barChartData.push({ data: [0], label: category });
    }
  }

  ngOnInit(): void {
    for (let i = 2020; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }
    this.month = Number(this.route.snapshot.queryParams.month) - 1;
    this.currentDate = this.route.snapshot.queryParams.currentDate ?? new Date();
    this.selectMonth(this.month);
  }

  /**
   * Select a month to update graph by category
   * @param month January = 0 to December = 11
   */
  selectMonth(month: number) {
    let isAverage = month < 0;
    this.month = month;
    const date = this.currentDate ?? new Date();
    this.yearText = date.getFullYear().toString();
    this.expenseService.fetch(date.getFullYear(), month).subscribe(expenses => {
      // total expenses
      let totalExpense = 0.0;
      expenses.data.forEach((values: any) => totalExpense += values.value);

      // Basics
      const basics = [CategoryConst.LIST[0], CategoryConst.LIST[1], CategoryConst.LIST[11]];
      this.setValueBarChartDataItem(0, basics, totalExpense, isAverage, expenses.data);

      // Entertainment
      const entertainment = [CategoryConst.LIST[3]];
      this.setValueBarChartDataItem(1, entertainment, totalExpense, isAverage, expenses.data);

      // Grocery
      const grocery = [CategoryConst.LIST[4]];
      this.setValueBarChartDataItem(2, grocery, totalExpense, isAverage, expenses.data);

      // Home
      const home = [CategoryConst.LIST[2], CategoryConst.LIST[5], CategoryConst.LIST[6], CategoryConst.LIST[8], CategoryConst.LIST[10], CategoryConst.LIST[12], CategoryConst.LIST[13]];
      this.setValueBarChartDataItem(3, home, totalExpense, isAverage, expenses.data);

      // Investments
      const investments = [CategoryConst.LIST[7]];
      this.setValueBarChartDataItem(4, investments, totalExpense, isAverage, expenses.data);

      // Miscellaneous
      const miscellaneous = [CategoryConst.LIST[9]];
      this.setValueBarChartDataItem(5, miscellaneous, totalExpense, isAverage, expenses.data);

      // Auto
      const auto = [CategoryConst.LIST[14], CategoryConst.LIST[15]];
      this.setValueBarChartDataItem(6, auto, totalExpense, isAverage, expenses.data);

      // TOTAL
      combineLatest([
        this.incomeService.fetchSum(date.getFullYear(), month),
        this.expenseService.fetchSum(date.getFullYear(), month)]
      ).subscribe(values => {
        this.income = 0.0;
        this.expense = 0.0;
        values[0].data.forEach((i: any) => this.income += i.total);
        values[1].data.forEach((e: any) => this.expense += e.total);
        this.income /= values[0].data.length;
        this.expense /= values[1].data.length;
        this.balance = this.income - this.expense;
      });
    });
  }

  /**
   * Set an item value in the barChartData
   * @param index Index of the category group
   * @param categoryFilters Categories to filter expenses
   * @param totalExpenses Total of expenses
   * @param isAverage true if want to get the average; othewise false
   * @param expenses Array of expenses
   */
  setValueBarChartDataItem(index: number, categoryFilters: string[], totalExpenses: number, isAverage: boolean, expenses: Expense[]) {
    expenses = expenses.filter((e: Expense) => categoryFilters.includes(e.category));
    this.categories[index] = { group: CategoryConst.GROUP[index], categories: [] };
    this.categories[index]['categories'].push(categoryFilters.join(', '));

    let sum = 0;
    expenses.forEach((e: Expense) => sum += e.value);
    if (isAverage) {
      const totalMonths = new Date().getMonth() + 1;
      sum = sum / totalMonths;
      totalExpenses = totalExpenses / totalMonths
    }
    let percent = sum * 100 / totalExpenses;

    this.barChartData[index].data = [sum];
    this.barChartData[index].label = `${CategoryConst.GROUP[index]} ${percent.toPrecision(2)}%`;
  }

  changeYear(year: number) {
    this.currentDate = new Date(year, 0);
    this.selectMonth(this.month);
  }

}
