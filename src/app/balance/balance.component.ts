import { Component, OnInit } from '@angular/core';
import { BalanceService } from './balance.service';

@Component({
  selector: 'app-monthly-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  monthlyBalance  = 0.0;
  annualBalance   = 0.0;
  expensesAverage = 0.0;
  incomeAverage   = 0.0;

  constructor(private balanceService: BalanceService) { }

  ngOnInit(): void {
    this.balanceService.balanceBehavior.subscribe(obj => {
      this.monthlyBalance = obj.monthlyBalance;
      this.annualBalance = obj.annualBalance;
      this.expensesAverage = obj.expensesAverage;
      this.incomeAverage = obj.incomeAverage;
    });
  }

}
