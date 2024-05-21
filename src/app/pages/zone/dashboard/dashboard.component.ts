import { Component, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { CashReceiptService } from '../../../services/cashReceipt/cash-receipt.service';
import { UtilService } from '../../../services/util/util.service';
import { DashboardCashReceipt } from '../../../interfaces/cashReceipts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  //! Inyecciones
  private cashReceiptSV     = inject(CashReceiptService);
  private utilSV            = inject(UtilService);
  //! -----------------------------------------------

  //* Señales
  private _loading = signal<boolean>(false);
  loading = computed<boolean>(() => this._loading());

  dahboardCashReceipt = computed<DashboardCashReceipt>(() => {
    return {
      expectedValue: 0,
      totalPaid: 0,
      cashReceipts: []
    };
  })
  //*------------------------------------------------

  actualMonth = new Date().getMonth() + 1;
  actualYear = new Date().getFullYear();

  listMonths = this.utilSV.listMonths;
  listYears = this.utilSV.listYears;


  ngOnInit() {
    this.searchData();
  }


  searchData() {
    this._loading.set(true);
    this.dahboardCashReceipt = computed<DashboardCashReceipt>(() => {
      return {
        expectedValue: 0,
        totalPaid: 0,
        cashReceipts: []
      };
    })
    setTimeout(() => {
      this.cashReceiptSV.getDashboardCashReceipt(this.actualYear, this.actualMonth).subscribe(res => {
        this.dahboardCashReceipt = computed<DashboardCashReceipt>(() => res);
      });
      this._loading.set(false);
    }, 1000);



  }
}
