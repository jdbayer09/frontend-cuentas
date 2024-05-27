import { Category } from "../categories";
import { PaymentMethod } from '../paymentMethods/paymentMethod.interface';

export interface CashReceipt {
  id:     number;
  name:   string;
  amount: number;
  month:  number;
  year:   number;
  paid:   boolean;
  category: Category;
  paymentMethod: PaymentMethod;
}
