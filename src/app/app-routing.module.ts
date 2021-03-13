import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'detailed-month', loadChildren: () => import('./detailed-month/detailed-month.module').then(m => m.DetailedMonthModule) },
  { path: 'income', loadChildren: () => import('./income/income.module').then(m => m.IncomeModule) },
  { path: 'expense', loadChildren: () => import('./expense/expense.module').then(m => m.ExpenseModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      // ,{ enableTracing: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
