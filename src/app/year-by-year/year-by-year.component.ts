import { combineLatest } from 'rxjs';
import { ExpenseService } from './../expense/expense.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { MonthConst } from './../shared/month-const';
import { NumberFormatter } from './../shared/number-formarter';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../income/income.service';
import { YearByYearChart } from './year-by-year-chart.model';
import { transformMonthlyData } from '../shared/helper/transform-data';

@Component({
  selector: 'app-year-by-year',
  templateUrl: './year-by-year.component.html',
  styleUrls: ['./year-by-year.component.scss']
})
export class YearByYearComponent implements OnInit {

  expenseYearByYearChart = new YearByYearChart();
  incomeYearByYearChart = new YearByYearChart();

  years: any[] = [];
  // the year to start the chart
  startYear = 2020;

  constructor(private expenseService: ExpenseService, private incomeService: IncomeService) {
    this.expenseYearByYearChart.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{}], yAxes: [{
          ticks: {
            suggestedMin: 50,
            suggestedMax: 100,
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
            return new Intl.NumberFormat().format(Number(value));
          }
        }
      },
      title: {
        display: true,
        text: 'EXPENSES YEAR OVER YEAR'
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return NumberFormatter.format(Number(tooltipItem.value));
          }
        },
      }
    };
    this.expenseYearByYearChart.barChartLabels = MonthConst.MONTHS;
    this.expenseYearByYearChart.barChartType = 'bar';
    this.expenseYearByYearChart.barChartLegend = true;
    this.expenseYearByYearChart.barChartPlugins = [ChartDataLabels];
    this.expenseYearByYearChart.barChartData = [];

    // Income
    this.incomeYearByYearChart.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{}], yAxes: [{
          ticks: {
            suggestedMin: 50,
            suggestedMax: 100,
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
            return new Intl.NumberFormat().format(Number(value));
          }
        }
      },
      title: {
        display: true,
        text: 'INCOME YEAR OVER YEAR'
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return NumberFormatter.format(Number(tooltipItem.value));
          }
        },
      }
    };
    this.incomeYearByYearChart.barChartLabels = MonthConst.MONTHS;
    this.incomeYearByYearChart.barChartType = 'bar';
    this.incomeYearByYearChart.barChartLegend = true;
    this.incomeYearByYearChart.barChartPlugins = [ChartDataLabels];
    this.incomeYearByYearChart.barChartData = [];
  }

  ngOnInit(): void {
    let expenseYearValues = [];
    let incomeYearValues = [];
    for (let year = this.startYear; year <= new Date().getFullYear(); year++) {
      expenseYearValues.push({ year: year, observable: this.expenseService.fetchSum(year) });
      incomeYearValues.push({ year: year, observable: this.incomeService.fetchSum(year) });
    }

    let expenseYearIndex = 0;
    expenseYearValues.sort((a: any, b: any) => a.year - b.year);
    combineLatest([expenseYearValues])
      .subscribe(values => {
        for (let index = 0; index < values.length; index++) {
          values[index].observable.subscribe((docs) => {
            this.setDataExpenses(docs, expenseYearIndex, values[index].year);
            expenseYearIndex++;
          });
        }
      });

    let incomeYearIndex = 0;
    incomeYearValues.sort((a: any, b: any) => a.year - b.year);
    combineLatest([incomeYearValues])
      .subscribe(values => {
        for (let index = 0; index < values.length; index++) {
          values[index].observable.subscribe((docs) => {
            this.setDataIncome(docs, incomeYearIndex, values[index].year);
            incomeYearIndex++;
          });
        }
      });
  }

  private setDataExpenses(docs: any, index: number, year: number) {
    const values = transformMonthlyData(docs.data);
    const total = values.reduce((sum: number, current: number) => sum + current, 0);
    if (values) {
      let avg = 0;
      values.forEach((e: number) => avg += e);
      avg = avg / values.length;
      this.years.push({ year: year, total: total, average: avg });
      if (index === 0) {
        this.expenseYearByYearChart.barChartData = [{ data: values, label: `${year}` }]
      } else {
        this.expenseYearByYearChart.barChartData = [...this.expenseYearByYearChart.barChartData, { data: values, label: `${year}` }]
      }
    };
  }

  private setDataIncome(docs: any, index: number, year: number) {
    const values = transformMonthlyData(docs.data);
    const total = values.reduce((sum: number, current: number) => sum + current, 0);
    if (values) {
      let avg = 0;
      values.forEach((e: number) => avg += e);
      avg = avg / values.length;
      // console.log(this.years[index], year)
      this.years[index] = { ...this.years[index], totalIncome: total, averageIncome: avg }
      if (index === 0) {
        this.incomeYearByYearChart.barChartData = [{ data: values, label: `${year}` }]
      } else {
        this.incomeYearByYearChart.barChartData = [...this.incomeYearByYearChart.barChartData, { data: values, label: `${year}` }]
      }
    };
  }

  getPercent(value1: number, value2: number) {
    return ((value1 * 100 / value2) - 100) / 100;
  }
}
