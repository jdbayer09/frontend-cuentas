import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UtilService } from '../../services/util/util.service';
import { CostsService } from '../../services/costs/costs.service';
import { PaymentMethodService } from '../../services/paymentMethod/payment-method.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { Cost, CostRequest } from '../../interfaces/costs';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../interfaces/base/messageRespones.interface';
import { BaseCategory } from '../../interfaces/categories';
import { BasePaymentMethod } from '../../interfaces/paymentMethods';

@Component({
  selector: 'app-costs-modal',
  templateUrl: './costs-modal.component.html',
  styleUrl: './costs-modal.component.scss'
})
export class CostsModalComponent {
  //! Inyecciones
  private config            = inject(DynamicDialogConfig);
  private ref               = inject(DynamicDialogRef);
  private costsSV           = inject(CostsService);
  private formBuilder       = inject(FormBuilder);
  private utilSV            = inject(UtilService);
  private paymentMethodSV   = inject(PaymentMethodService);
  private categorySV        = inject(CategoriesService);
  //! -----------------------------------------------

  listMohnts = this.utilSV.listMonths;
  listYears  = this.utilSV.listYears;
  disableVal = true;

  //* Señales
  private _loading = signal<boolean>(false);
  loading = computed<boolean>(() => this._loading());

  private _type = signal<'edit' | 'create'>(this.config.data.type);
  type = computed<'edit' | 'create'>(() => this._type());

  private _cost = signal<Cost>(this.config.data.cost);
  cost = computed<Cost>(() => this._cost());

  private _error = signal<string | null>(null);
  error = computed<string | null>(() => this._error());

  listCategory = computed<BaseCategory[]>(() => []);
  listPaymentMethod = computed<BasePaymentMethod[]>(() => []);
  //*------------------------------------------------

  formCost!: FormGroup;

  constructor() {
    this.buildForm();
    this.paymentMethodSV.listActivePaymentMethods().subscribe(resp => {
      this.listPaymentMethod = computed<BasePaymentMethod[]>(() => resp);
    });

    this.categorySV.listActiveCategories().subscribe(resp => {
      this.listCategory = computed<BaseCategory[]>(() => resp);
    });
  }

  saveAction() {
    const data: CostRequest = this.formCost.value;
    if (this.disableVal) {
      data.replicateVal = 0;
    }
    if (this.type() === 'edit' && this.cost()) {
      this.serviceAction(this.costsSV.updateCost(this.cost(), data));
    } else if (this.type() === 'create') {
      this.serviceAction(this.costsSV.createCost(data));
    }
  }

  closeModal() {
    this.ref.close();
  }

  private serviceAction(observable: Observable<MessageResponse<Cost>>) {
    this._loading.set(true);
    this._error.set(null);
    this.formCost.disable();
    setTimeout(() => {
      observable.subscribe({
        next: resp => {
          this.ref.close({costResponse: resp})
        },
        error: err => {
          this._error.set(err);
          this._loading.set(false);
          this.formCost.enable();
        }
      });
    }, 500);
  }

  disableReplicateVal() {
    if(!this.disableVal) {
      this.formCost.controls['replicateVal'].disable();
      this.formCost.controls['replicateVal'].setValue(0);
    } else {
      this.formCost.controls['replicateVal'].enable();
    }
    this.disableVal = !this.disableVal;
  }

  private buildForm() {
    this.formCost = this.formBuilder.group({
      name: [
        this.cost()?.name ?? null,
        [
          Validators.required,
          Validators.maxLength(60)
        ]
      ],
      amount: [
        this.cost()?.amount ?? null,
        [
          Validators.required,
          Validators.min(0.0)
        ]
      ],
      month: [
        this.cost()?.month ?? null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(12)
        ]
      ],
      year: [
        this.cost()?.year ?? null,
        [
          Validators.required,
          Validators.min(2022)
        ]
      ],
      paymentMethodId: [
        this.cost()?.paymentMethod.id ?? null,
        [
          Validators.required
        ]
      ],
      categoryId: [
        this.cost()?.category.id ?? null,
        [
          Validators.required
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
      ]
    });
    this.formCost.enable();
    if (this.type() === 'create') {
      this.formCost.controls['month'].setValue(new Date().getMonth() + 1);
      this.formCost.controls['year'].setValue(new Date().getFullYear());
      this.formCost.controls['replicateVal'].disable();
    }
  }
}
