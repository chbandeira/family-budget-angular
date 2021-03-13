import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ModalConfirmComponent } from './modal/modal-confirm/modal-confirm.component';


@NgModule({
  declarations: [
    AlertComponent,
    ModalConfirmComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    ModalConfirmComponent
  ]
})
export class SharedModule { }
