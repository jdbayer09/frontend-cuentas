import { BasePaymentMethod } from "../paymentMethods";
import { BaseCost } from "./baseCost.interface";

export interface DashboardCostsByPaymentMethod {
  costs: BaseCost[];
  paymentMethod: BasePaymentMethod;
  expectedValue: number;
  totalPaid: number;
}
