import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashReceiptModalComponent } from './cash-receipt-modal.component';


@NgModule({
  declarations: [
    CashReceiptModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CashReceiptModalComponent
  ]
})
export class CashReceiptModalModule { }
