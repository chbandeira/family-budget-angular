import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ImportCsvRoutingModule } from './import-csv-routing.module';
import { ImportCsvComponent } from './import-csv.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ImportCsvComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ImportCsvRoutingModule,
    SharedModule
  ]
})
export class ImportCsvModule { }
