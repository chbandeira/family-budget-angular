import { MainChartService } from './main-chart.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { MonthConst } from '../../shared/month-const';
import { NumberFormatter } from '../../shared/number-formarter';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss']
})
export class MainChartComponent implements OnInit {

  barChartOptions: ChartOptions;
  barChartLabels: Label[];
  barChartType: ChartType;
  barChartLegend: boolean;
  barChartPlugins: any;
  barChartData: ChartDataSets[];

  constructor(private mainChartService: MainChartService) {
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
        display: true
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
    this.barChartData = [
      { data: new Array(12), label: 'Expenses' },
      { data: new Array(12), label: 'Income' }
    ];
  }

  ngOnInit(): void {
    this.mainChartService.barChartDataExpenseBehavior.subscribe(obj => {
      if (obj && obj.values) {
        let avg = 0;
        obj.values.forEach((e: number) => avg += e);
        avg = avg / obj.values.length;
        this.barChartData[0].data = obj.values;
      };
    });
    this.mainChartService.barChartDataIncomeBehavior.subscribe(obj => {
      if (obj && obj.values) {
        let avg = 0;
        obj.values.forEach((e: number) => avg += e);
        avg = avg / obj.values.length;
        this.barChartData[1].data = obj.values;
      };
    });
  }
}
