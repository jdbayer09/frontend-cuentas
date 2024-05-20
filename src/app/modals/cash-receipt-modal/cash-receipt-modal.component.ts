import { Component, computed, inject, signal } from '@angular/core';
import { COLORS } from '../../data';
import { CashReceiptService } from '../../services/cashReceipt/cash-receipt.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../../services/util/util.service';
import { CashReceipt, CashReceiptRequest } from '../../interfaces/cashReceipts';
import { MessageResponse } from '../../interfaces/base/messageRespones.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cash-receipt-modal',
  templateUrl: './cash-receipt-modal.component.html',
  styleUrl: './cash-receipt-modal.component.scss'
})
export class CashReceiptModalComponent {
  //! Inyecciones
  private config        = inject(DynamicDialogConfig);
  private ref           = inject(DynamicDialogRef);
  private cashReceiptSV = inject(CashReceiptService);
  private formBuilder   = inject(FormBuilder);
  private utilSV        = inject(UtilService);
  //! -----------------------------------------------

  listColors = COLORS;
  listMohnts = this.utilSV.listMonths;
  listYears  = this.utilSV.listYears;
  disableVal = true;

  //* Señales
  private _loading = signal<boolean>(false);
  loading = computed<boolean>(() => this._loading());

  private _type = signal<'edit' | 'create'>(this.config.data.type);
  type = computed<'edit' | 'create'>(() => this._type());
  private _cashReceipt = signal<CashReceipt>(this.config.data.cashReceipt);
  cashReceipt = computed<CashReceipt>(() => this._cashReceipt());

  private _error = signal<string | null>(null);
  error = computed<string | null>(() => this._error());
  //*------------------------------------------------

  formCashReceipt!: FormGroup;

  constructor() {
    this.buildForm();
  }

  saveAction() {
    const data: CashReceiptRequest = this.formCashReceipt.value;
    if (this.disableVal) {
      data.replicateVal = 0;
    }
    if (this.type() === 'edit' && this.cashReceipt()) {
      this.serviceAction(this.cashReceiptSV.updateCashReceipt(this.cashReceipt(), data));
    } else if (this.type() === 'create') {
      this.serviceAction(this.cashReceiptSV.createCashReceipt(data));
    }
  }

  closeModal() {
    this.ref.close();
  }

  private serviceAction(observable: Observable<MessageResponse<CashReceipt>>) {
    this._loading.set(true);
    this._error.set(null);
    this.formCashReceipt.disable();
    setTimeout(() => {
      observable.subscribe({
        next: resp => {
          this.ref.close({cashReceiptResponse: resp})
        },
        error: err => {
          this._error.set(err);
          this._loading.set(false);
          this.formCashReceipt.enable();
        }
      });
    }, 500);
  }

  disableReplicateVal() {
    if(!this.disableVal) {
      this.formCashReceipt.controls['replicateVal'].disable();
      this.formCashReceipt.controls['replicateVal'].setValue(0);
    } else {
      this.formCashReceipt.controls['replicateVal'].enable();
    }
    this.disableVal = !this.disableVal;
  }

  private buildForm() {
    this.formCashReceipt = this.formBuilder.group({
      name: [
        this.cashReceipt()?.name ?? null,
        [
          Validators.required,
          Validators.maxLength(60)
        ]
      ],
      amount: [
        this.cashReceipt()?.amount ?? null,
        [
          Validators.required,
          Validators.min(0.0)
        ]
      ],
      month: [
        this.cashReceipt()?.month ?? null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(12)
        ]
      ],
      year: [
        this.cashReceipt()?.year ?? null,
        [
          Validators.required,
          Validators.min(2022)
        ]
      ],
      replicate: [
        false,
        [
          Validators.required
        ]
      ],
      replicateVal: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(12)
        ]
      ],
      color: [
        this.cashReceipt()?.color ?? null,
        [
          Validators.required,
          Validators.maxLength(16)
        ]
      ]
    });
    this.formCashReceipt.enable();
    if (this.type() === 'create') {
      this.formCashReceipt.controls['month'].setValue(new Date().getMonth() + 1);
      this.formCashReceipt.controls['year'].setValue(new Date().getFullYear());
      this.formCashReceipt.controls['replicateVal'].disable();
    }
  }
}
