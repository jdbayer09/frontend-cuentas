import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentMethodsRoutingModule } from './payment-methods-routing.module';
import { PaymentMethodsComponent } from './payment-methods.component';
import { PaymentMethodModalModule } from '../../../modals/payment-method-modal/payment-method-modal.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    PaymentMethodsComponent
  ],
  imports: [
    CommonModule,
    PaymentMethodsRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    PaymentMethodModalModule
  ]
})
export class PaymentMethodsModule { }
