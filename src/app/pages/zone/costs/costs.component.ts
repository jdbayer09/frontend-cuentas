import { Component, OnInit, ViewChildren, computed, inject, signal } from '@angular/core';
import { CostsService } from '../../../services/costs/costs.service';
import { UtilService } from '../../../services/util/util.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Cost } from '../../../interfaces/costs';
import { BaseCategory } from '../../../interfaces/categories';
import { BasePaymentMethod } from '../../../interfaces/paymentMethods';
import { PaymentMethodService } from '../../../services/paymentMethod/payment-method.service';
import { CategoriesService } from '../../../services/categories/categories.service';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../../interfaces/base/messageRespones.interface';
import { CostsModalComponent } from '../../../modals/costs-modal/costs-modal.component';
import { PrimeNGConfig } from 'primeng/api';
import { TestBed } from '@angular/core/testing';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrl: './costs.component.scss'
})
export class CostsComponent implements OnInit {
  //! Inyecciones
  private costsSV           = inject(CostsService);
  private utilSV            = inject(UtilService);
  private dialogSV          = inject(DialogService);
  private paymentMethodSV   = inject(PaymentMethodService);
  private categorySV        = inject(CategoriesService);
  //! -----------------------------------------------
  //* Señales
  private _loading = signal<boolean>(false);
  loading = computed<boolean>(() => this._loading());

  private _listCosts = signal<Cost[]>([]);
  listCosts = computed<Cost[]>(() => this._listCosts());

  private _modalCostRef = signal<DynamicDialogRef | undefined>(undefined);
  modalCostRef = computed<DynamicDialogRef | undefined>(() => this._modalCostRef());

  listCategory = computed<BaseCategory[]>(() => []);
  listPaymentMethod = computed<BasePaymentMethod[]>(() => []);
  //*------------------------------------------------

  actualMonth = new Date().getMonth() + 1;
  actualYear = new Date().getFullYear();

  listMonths = this.utilSV.listMonths;
  listYears = this.utilSV.listYears;

  constructor(private config: PrimeNGConfig) {
    this.paymentMethodSV.listActivePaymentMethods().subscribe(resp => {
      this.listPaymentMethod = computed<BasePaymentMethod[]>(() => resp);
    });

    this.categorySV.listActiveCategories().subscribe(resp => {
      this.listCategory = computed<BaseCategory[]>(() => resp);
    });

    this.config.setTranslation({
      clear: 'Limpiar',
      apply: 'Aplicar'
    });
  }

  ngOnInit(): void {
    this.loadListCosts();
  }

  loadListCosts(table?: Table) {
    this._loading.set(true);
    if (table) {
      table.clear();
    }
    setTimeout(() => {
      this.costsSV.listAllCosts(this.actualYear, this.actualMonth).subscribe({
        next: resp => {
          this._loading.set(false);
          this._listCosts.set(resp);
        },
        error: err => {
          this.utilSV.setMessage('¡Error!', err, 'error');
          this._loading.set(false);
        }
      });
    }, 500);
  }

  payCost(cost: Cost) {
    if(cost.month <= (new Date().getMonth() + 1) && cost.year <= new Date().getFullYear()) {
      this.utilSV.confirm({
        message: `¿Esta seguro que desea marcar como pago el gasto: "<b>${cost.name}</b>" ?`,
        accept: () => {
          this.serviceAction(this.costsSV.payCost(cost));
        }
      });
    } else {
      this.utilSV.setMessage('¡Error!', 'Solo se puede marcar como pago gastos del mes actual o inferior', 'error');
    }
  }

  deleteCost(cost: Cost) {
    if(cost.month <= (new Date().getMonth() + 1) && cost.year <= new Date().getFullYear()) {
      this.utilSV.confirm({
        message: `¿Esta seguro que desea eliminar el gasto: "<b>${cost.name}</b>" ?`,
        accept: () => {
          this.serviceAction(this.costsSV.deleteCost(cost));
        }
      });
    } else {
      this.utilSV.setMessage('¡Error!', 'Solo se puede eliminar el pago gastos del mes actual o inferior', 'error');
    }
  }

  getMonth(month: number): string {
    return this.utilSV.getMont(month);
  }

  openModalCost(type: 'edit' | 'create', cost?: Cost) {
    if (type === 'edit' && cost?.paid)
      return;
    this._modalCostRef.set(this.dialogSV.open(CostsModalComponent,{
      header: `${(type === 'edit'? 'Actualizar' : 'Nueva')} Gasto` ,
      width: '45rem',
      closable: false,
      data: {
        type,
        cost
      }
    }));
    this.modalCostRef()?.onClose.subscribe((resp: {costResponse: MessageResponse<Cost>}) => {
      if (resp && resp.costResponse) {
        this.utilSV.setMessage(resp.costResponse.tittle, resp.costResponse.message, 'success');
        this.loadListCosts();
      }
      this._modalCostRef.set(undefined);
    });
  }

  private serviceAction(observable: Observable<MessageResponse<number | Cost>>) {
    this._loading.set(true);
    setTimeout(() => {
      observable.subscribe({
        next: resp => {
          this.utilSV.setMessage(resp.tittle, resp.message, 'success');
          this.loadListCosts();
        },
        error: err => {
          this.utilSV.setMessage('¡Error!', err, 'error');
          this._loading.set(false);
        }
      });
    }, 500);
  }
}
