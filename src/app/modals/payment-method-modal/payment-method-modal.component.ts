import { Component, computed, inject, signal } from '@angular/core';
import { COLORS, ICONS } from '../../data';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentMethodService } from '../../services/paymentMethod/payment-method.service';
import { BasePaymentMethod, PaymentMethod, PaymentMethodRequest } from '../../interfaces/paymentMethods';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../interfaces/base/messageRespones.interface';

@Component({
  selector: 'app-payment-method-modal',
  templateUrl: './payment-method-modal.component.html',
  styleUrl: './payment-method-modal.component.scss'
})
export class PaymentMethodModalComponent {
  listColors = COLORS;
  listIcons = ICONS;

  //! Inyecciones
  private config            = inject(DynamicDialogConfig);
  private ref               = inject(DynamicDialogRef);
  private paymentMethodSV   = inject(PaymentMethodService);
  private formBuilder       = inject(FormBuilder);
  //! -----------------------------------------------

  //* Señales
  private _loading = signal<boolean>(false);
  loading = computed<boolean>(() => this._loading());

  private _type = signal<'edit' | 'create'>(this.config.data.type);
  type = computed<'edit' | 'create'>(() => this._type());
  private _paymentMethod = signal<PaymentMethod>(this.config.data.paymentMethod);
  paymentMethod = computed<PaymentMethod>(() => this._paymentMethod());

  private _error = signal<string | null>(null);
  error = computed<string | null>(() => this._error());
  //*------------------------------------------------

  formPaymentMethod!: FormGroup;

  constructor() {
    this.buildForm();
  }

  saveAction() {
    const data: PaymentMethodRequest = this.formPaymentMethod.value;
    if (this.type() === 'edit' && this.paymentMethod()) {
      this.serviceAction(this.paymentMethodSV.updatePaymentMethod(this.paymentMethod(), data));
    } else if (this.type() === 'create') {
      this.serviceAction(this.paymentMethodSV.createPaymentMethod(data));
    }
  }


  private serviceAction(observable: Observable<MessageResponse<BasePaymentMethod>>) {
    this._loading.set(true);
    this._error.set(null);
    this.formPaymentMethod.disable();
    setTimeout(() => {
      observable.subscribe({
        next: resp => {
          this.ref.close({paymentMethodResponse: resp})
        },
        error: err => {
          this._error.set(err);
          this._loading.set(false);
          this.formPaymentMethod.enable();
        }
      });
    }, 500);
  }
  closeModal() {
    this.ref.close();
  }

  private buildForm() {
    this.formPaymentMethod = this.formBuilder.group({
      name: [
        this.paymentMethod()?.name ?? null,
        [
          Validators.required,
          Validators.maxLength(60)
        ]
      ],
      description: [
        this.paymentMethod()?.description ?? null,
        []
      ],
      color: [
        this.paymentMethod()?.color ?? null,
        [
          Validators.required,
          Validators.maxLength(16)
        ]
      ],
      icon: [
        this.paymentMethod()?.icon ?? null,
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ]
    });
    this.formPaymentMethod.enable();
  }
}
