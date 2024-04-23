import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { UtilService } from '../../../services/util/util.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaymentMethodService } from '../../../services/paymentMethod/payment-method.service';
import { BasePaymentMethod, PaymentMethod } from '../../../interfaces/paymentMethods';
import { Table } from 'primeng/table';
import { PaymentMethodModalComponent } from '../../../modals/payment-method-modal/payment-method-modal.component';
import { MessageResponse } from '../../../interfaces/base/messageRespones.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrl: './payment-methods.component.scss'
})
export class PaymentMethodsComponent implements OnInit, OnDestroy {

  //! Inyecciones
  private paymentMethodSV   = inject(PaymentMethodService);
  private utilSV            = inject(UtilService);
  private dialogSV          = inject(DialogService);
  //! -----------------------------------------------
  //* Señales
  private _loading = signal<boolean>(false);
  loading = computed<boolean>(() => this._loading());

  private _listPaymentMethods = signal<PaymentMethod[]>([]);
  listPaymentMethods = computed<PaymentMethod[]>(() => this._listPaymentMethods());

  private _modalPaymentMethodRef = signal<DynamicDialogRef | undefined>(undefined);
  modalPaymentMethodRef = computed<DynamicDialogRef | undefined>(() => this._modalPaymentMethodRef());
  //*------------------------------------------------

  ngOnInit(): void {
    this.loadListPaymentMethods();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  loadListPaymentMethods() {
    this._loading.set(true);
    setTimeout(() => {
      this.paymentMethodSV.listAllPaymentMethods().subscribe({
        next: resp => {
          this._loading.set(false);
          this._listPaymentMethods.set(resp);
        },
        error: err => {
          this.utilSV.setMessage('¡Error!', err, 'error');
          this._loading.set(false);
        }
      });
    }, 500);
  }


  openModalPaymentMethods(type: 'edit' | 'create', paymentMethod?: PaymentMethod) {
    this._modalPaymentMethodRef.set(this.dialogSV.open(PaymentMethodModalComponent,{
      header: `${(type === 'edit'? 'Actualizar' : 'Nuevo')} Método de Pago` ,
      width: '40rem',
      closable: false,
      data: {
        type,
        paymentMethod
      }
    }));
    this.modalPaymentMethodRef()?.onClose.subscribe((resp: {paymentMethodResponse: MessageResponse<BasePaymentMethod>}) => {
      if (resp && resp.paymentMethodResponse) {
        this.utilSV.setMessage(resp.paymentMethodResponse.tittle, resp.paymentMethodResponse.message, 'success');
        this.loadListPaymentMethods();
      }
      this._modalPaymentMethodRef.set(undefined);
    });
  }

  ngOnDestroy(): void {
    if(this.modalPaymentMethodRef()) {
      this.modalPaymentMethodRef()?.close();
      this._modalPaymentMethodRef.set(undefined);
    }
  }

  enablePaymentMethod(paymentMethod: PaymentMethod) {
    this.utilSV.confirm({
      message: `¿Esta seguro que desea habilitar el Método de pago: "<b>${paymentMethod.name}</b>" ?`,
      accept: () => {
        this.serviceAction(this.paymentMethodSV.enablePaymentMethod(paymentMethod));
      }
    });
  }

  disablePaymentMethod(paymentMethod: PaymentMethod) {
    this.utilSV.confirm({
      message: `¿Esta seguro que desea deshabilitar el Método de pago: "<b>${paymentMethod.name}</b>" ?`,
      accept: () => {
        this.serviceAction(this.paymentMethodSV.disablePaymentMethod(paymentMethod));
      }
    });
  }

  private serviceAction(observable: Observable<MessageResponse<number | BasePaymentMethod>>) {
    this._loading.set(true);
    setTimeout(() => {
      observable.subscribe({
        next: resp => {
          this.utilSV.setMessage(resp.tittle, resp.message, 'success');
          this.loadListPaymentMethods();
        },
        error: err => {
          this.utilSV.setMessage('¡Error!', err, 'error');
          this._loading.set(false);
        }
      });
    }, 500);
  }

}
