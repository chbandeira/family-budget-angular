import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailedMonthComponent } from './detailed-month.component';

const routes: Routes = [
  { path: '', component: DetailedMonthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailedMonthRoutingModule { }
