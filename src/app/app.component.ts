import { Component } from '@angular/core';
import { MonthlyBalanceService } from './monthly-balance/monthly-balance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Family Budget';

  constructor(private monthlyBalanceService: MonthlyBalanceService) { }

  ngOnInit(): void {
    this.monthlyBalanceService.update(new Date());
  }

}
