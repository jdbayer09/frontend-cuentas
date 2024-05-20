import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashReceiptsRoutingModule } from './cash-receipts-routing.module';
import { CashReceiptsComponent } from './cash-receipts.component';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CashReceiptModalModule } from '../../../modals/cash-receipt-modal/cash-receipt-modal.module';


@NgModule({
  declarations: [
    CashReceiptsComponent
  ],
  imports: [
    CommonModule,
    CashReceiptsRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    CashReceiptModalModule
  ]
})
export class CashReceiptsModule { }
