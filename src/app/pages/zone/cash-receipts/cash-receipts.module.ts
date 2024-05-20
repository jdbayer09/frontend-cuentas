import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashReceiptsRoutingModule } from './cash-receipts-routing.module';
import { CashReceiptsComponent } from './cash-receipts.component';


@NgModule({
  declarations: [
    CashReceiptsComponent
  ],
  imports: [
    CommonModule,
    CashReceiptsRoutingModule
  ]
})
export class CashReceiptsModule { }
