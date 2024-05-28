import { DashboardCostsByCategory } from "./dashboardCostByCategory.interface";
import { DashboardCostsByPaymentMethod } from "./dashboardCostByPaymentMethod.interface";

export interface DashboardCost {
  expectedValue: number;
  totalPaid: number;
  costsByCategory: DashboardCostsByCategory[];
  costsByPaymentMethod: DashboardCostsByPaymentMethod[];
}
