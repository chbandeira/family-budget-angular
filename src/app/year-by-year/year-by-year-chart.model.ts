import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";

export class YearByYearChart {
  barChartOptions!: ChartOptions;
  barChartLabels!: Label[];
  barChartType!: ChartType;
  barChartLegend!: boolean;
  barChartPlugins!: any;
  barChartData!: ChartDataSets[];
}
