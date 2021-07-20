import { Component } from '@angular/core';
import { BalanceService } from './balance/balance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Family Budget';

  constructor(private balanceService: BalanceService) { }

  ngOnInit(): void {
    this.balanceService.update(new Date());
  }

}
