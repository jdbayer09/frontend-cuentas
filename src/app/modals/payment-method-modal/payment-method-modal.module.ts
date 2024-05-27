import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { PaymentMethodModalComponent } from './payment-method-modal.component';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    PaymentMethodModalComponent
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
    InputNumberModule
  ],
  exports: [
    PaymentMethodModalComponent
  ]
})
export class PaymentMethodModalModule { }
