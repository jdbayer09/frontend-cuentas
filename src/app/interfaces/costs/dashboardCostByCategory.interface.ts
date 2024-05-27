import { Category } from "../categories";
import { BaseCost } from "./baseCost.interface";

export interface DashboardCostsByCategory {
  costs: BaseCost[];
  category: Category;
  expectedValue: number;
  totalPaid: number;
}
