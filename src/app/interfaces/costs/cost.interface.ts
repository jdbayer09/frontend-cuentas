import { Category } from "../categories";
import { PaymentMethod } from '../paymentMethods/paymentMethod.interface';

export interface Cost {
  id:     number;
  name:   string;
  amount: number;
  month:  number;
  year:   number;
  paid:   boolean;
  category: Category;
  paymentMethod: PaymentMethod;
}
