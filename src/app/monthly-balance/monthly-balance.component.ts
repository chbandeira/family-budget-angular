import { MonthlyBalanceService } from './monthly-balance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-balance',
  templateUrl: './monthly-balance.component.html',
  styleUrls: ['./monthly-balance.component.scss']
})
export class MonthlyBalanceComponent implements OnInit {
  monthlyBalance  = 0.0;
  annualBalance   = 0.0;
  expensesAverage = 0.0;
  incomeAverage   = 0.0;

  constructor(private monthlyBalanceService: MonthlyBalanceService) { }

  ngOnInit(): void {
    this.monthlyBalanceService.balanceBehavior.subscribe(obj => {
      this.monthlyBalance = obj.monthlyBalance;
      this.annualBalance = obj.annualBalance;
      this.expensesAverage = obj.expensesAverage;
      this.incomeAverage = obj.incomeAverage;
    });
  }

}
