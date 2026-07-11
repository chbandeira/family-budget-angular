import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportCsvComponent } from './import-csv.component';

const routes: Routes = [
  { path: '', component: ImportCsvComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportCsvRoutingModule { }
