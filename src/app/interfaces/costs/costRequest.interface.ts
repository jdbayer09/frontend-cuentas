export interface CostRequest {
  name:   string;
  amount: number;
  month:  number;
  year:   number;
  paymentMethodId: number;
  categoryId: number;
  replicate: boolean;
  replicateVal: number;
}
