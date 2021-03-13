import { DetailedMonthComponent } from './detailed-month.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailedMonthRoutingModule } from './detailed-month-routing.module';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [DetailedMonthComponent],
  imports: [
    CommonModule,
    DetailedMonthRoutingModule,
    ChartsModule
  ],
  exports: [DetailedMonthComponent]
})
export class DetailedMonthModule { }
