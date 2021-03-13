import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IncomeService } from '../income.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeTableService {

  private incomes: any = [];
  private totalIncome = 0.0;
  incomesBehavior: BehaviorSubject<any[]>;
  totalIncomeBehavior: BehaviorSubject<number>;

  constructor(private incomeService: IncomeService) {
    this.incomesBehavior = new BehaviorSubject(this.incomes);
    this.totalIncomeBehavior = new BehaviorSubject(this.totalIncome);
  }

  update(date: Date) {
    this.totalIncome = 0.0;
    this.incomeService.fetch(date.getFullYear(), date.getMonth()).subscribe(docs => {
      this.incomes = docs.data;
      this.incomes.forEach((doc: any) => {
        this.totalIncome += doc.value;
        doc.date = doc.date.split('T')[0]; //remove timezone
      });

      this.incomesBehavior.next(this.incomes);
      this.totalIncomeBehavior.next(this.totalIncome);
    });
  }
}
