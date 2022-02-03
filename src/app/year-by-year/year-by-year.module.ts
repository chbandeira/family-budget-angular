import { ChartsModule } from 'ng2-charts';
import { YearByYearComponent } from './year-by-year.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearByYearRoutingModule } from './year-by-year-routing.module';



@NgModule({
  declarations: [
    YearByYearComponent
  ],
  imports: [
    CommonModule,
    YearByYearRoutingModule,
    ChartsModule
  ],
  exports: [
    YearByYearComponent
  ]
})
export class YearByYearModule { }
