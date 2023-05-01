import { combineLatest } from 'rxjs';
import { ExpenseService } from './../expense/expense.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { MonthConst } from './../shared/month-const';
import { NumberFormatter } from './../shared/number-formarter';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-year-by-year',
  templateUrl: './year-by-year.component.html',
  styleUrls: ['./year-by-year.component.scss']
})
export class YearByYearComponent implements OnInit {

  barChartOptions: ChartOptions;
  barChartLabels: Label[];
  barChartType: ChartType;
  barChartLegend: boolean;
  barChartPlugins: any;
  barChartData: ChartDataSets[];

  years: any[] = [];
  // the year to start the chart
  startYear = 2019;

  constructor(private expenseService: ExpenseService) {
    this.barChartOptions = {
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
    this.barChartLabels = MonthConst.MONTHS;
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = [ChartDataLabels];
    this.barChartData = [];
  }

  ngOnInit(): void {
    let yearsFetch = [];
    for (let year = this.startYear; year <= new Date().getFullYear(); year++) {
      yearsFetch.push({ year: year, observable: this.expenseService.fetchSum(year) });
    }
    let yearIndex = 0;
    combineLatest([yearsFetch])
      .subscribe(values => {
        for (let index = 0; index < values.length; index++) {
          values[index].observable.subscribe((docs) => {
            if (docs.data.length) {
              this.setData(docs, yearIndex, values[index].year);
              yearIndex++;
            }
          });
        }
      });
  }

  private setData(docs: any, index: number, year: number) {
    docs.data.sort((a: any, b: any) => a._id - b._id);
    const values = docs.data.map((doc: any) => parseInt(doc.total));
    const total = values.reduce((sum: number, current: number) => sum + current, 0);
    if (values) {
      let avg = 0;
      values.forEach((e: number) => avg += e);
      avg = avg / values.length;
      this.years.push({ year: year, total: total, average: avg });
      if (index === 0) {
        this.barChartData = [{ data: values, label: `${year}` }]
      } else {
        this.barChartData = [...this.barChartData, { data: values, label: `${year}` }]
      }
    };
  }
}
