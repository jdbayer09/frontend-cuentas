import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashReceiptModalComponent } from './cash-receipt-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';



@NgModule({
  declarations: [
    CashReceiptModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    ProgressBarModule,
    CheckboxModule,
    InputNumberModule
  ],
  exports: [
    CashReceiptModalComponent
  ]
})
export class CashReceiptModalModule { }
