import { CashReceipt } from "./cashReceipt.interface";

export interface DashboardCashReceipt {
  cashReceipts:  CashReceipt[];
  expectedValue: number;
  totalPaid:     number;
}


