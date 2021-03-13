import { MonthlyBalanceService } from './monthly-balance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-balance',
  templateUrl: './monthly-balance.component.html',
  styleUrls: ['./monthly-balance.component.scss']
})
export class MonthlyBalanceComponent implements OnInit {
  value = 0.0;

  constructor(private monthlyBalanceService: MonthlyBalanceService) { }

  ngOnInit(): void {
    this.monthlyBalanceService.balanceBehavior.subscribe(value => this.value = value);
  }

}
