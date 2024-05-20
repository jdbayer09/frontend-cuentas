import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CashReceiptService } from '../../../services/cashReceipt/cash-receipt.service';
import { UtilService } from '../../../services/util/util.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CashReceipt } from '../../../interfaces/cashReceipts';
import { Table } from 'primeng/table';
import { CashReceiptModalComponent } from '../../../modals/cash-receipt-modal/cash-receipt-modal.component';
import { MessageResponse } from '../../../interfaces/base/messageRespones.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cash-receipts',
  templateUrl: './cash-receipts.component.html',
  styleUrl: './cash-receipts.component.scss'
})
export class CashReceiptsComponent implements OnInit {

  //! Inyecciones
  private cashReceiptSV     = inject(CashReceiptService);
  private utilSV            = inject(UtilService);
  private dialogSV          = inject(DialogService);
  //! -----------------------------------------------
  //* Señales
  private _loading = signal<boolean>(false);
  loading = computed<boolean>(() => this._loading());

  private _listCashReceipt = signal<CashReceipt[]>([]);
  listCashReceipt = computed<CashReceipt[]>(() => this._listCashReceipt());

  private _modalCashReceiptRef = signal<DynamicDialogRef | undefined>(undefined);
  modalCashReceiptRef = computed<DynamicDialogRef | undefined>(() => this._modalCashReceiptRef());
  //*------------------------------------------------

  actualMonth = new Date().getMonth() + 1;
  actualYear = new Date().getFullYear();

  listMonths = this.utilSV.listMonths;
  listYears = this.utilSV.listYears;

  ngOnInit(): void {
    this.loadListCashReceipt();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  loadListCashReceipt() {
    this._loading.set(true);
    setTimeout(() => {
      this.cashReceiptSV.listAllCashReceipt(this.actualYear, this.actualMonth).subscribe({
        next: resp => {
          this._loading.set(false);
          this._listCashReceipt.set(resp);
        },
        error: err => {
          this.utilSV.setMessage('¡Error!', err, 'error');
          this._loading.set(false);
        }
      });
    }, 500);
  }

  payCashReceipt(cashReceipt: CashReceipt) {
    this.utilSV.confirm({
      message: `¿Esta seguro que desea marcar como pago el ingreso: "<b>${cashReceipt.name}</b>" ?`,
      accept: () => {
        this.serviceAction(this.cashReceiptSV.payCashReceipt(cashReceipt));
      }
    });
  }

  getMonth(month: number): string {
    return this.utilSV.getMont(month);
  }

  openModalCashReceipt(type: 'edit' | 'create', cashReceipt?: CashReceipt) {
    this._modalCashReceiptRef.set(this.dialogSV.open(CashReceiptModalComponent,{
      header: `${(type === 'edit'? 'Actualizar' : 'Nueva')} Ingreso` ,
      width: '40rem',
      closable: false,
      data: {
        type,
        cashReceipt
      }
    }));
    this.modalCashReceiptRef()?.onClose.subscribe((resp: {cashReceiptResponse: MessageResponse<CashReceipt>}) => {
      if (resp && resp.cashReceiptResponse) {
        this.utilSV.setMessage(resp.cashReceiptResponse.tittle, resp.cashReceiptResponse.message, 'success');
        this.loadListCashReceipt();
      }
      this._modalCashReceiptRef.set(undefined);
    });
  }

  private serviceAction(observable: Observable<MessageResponse<number | CashReceipt>>) {
    this._loading.set(true);
    setTimeout(() => {
      observable.subscribe({
        next: resp => {
          this.utilSV.setMessage(resp.tittle, resp.message, 'success');
          this.loadListCashReceipt();
        },
        error: err => {
          this.utilSV.setMessage('¡Error!', err, 'error');
          this._loading.set(false);
        }
      });
    }, 500);
  }

}
