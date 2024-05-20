import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashReceiptsRoutingModule } from './cash-receipts-routing.module';
import { CashReceiptsComponent } from './cash-receipts.component';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CashReceiptModalModule } from '../../../modals/cash-receipt-modal/cash-receipt-modal.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CashReceiptsComponent
  ],
  imports: [
    CommonModule,
    CashReceiptsRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    DropdownModule,
    CashReceiptModalModule
  ]
})
export class CashReceiptsModule { }
