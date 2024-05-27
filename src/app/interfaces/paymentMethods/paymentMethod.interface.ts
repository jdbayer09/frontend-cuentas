export interface PaymentMethod {
  id:          number;
  name:        string;
  color:       string;
  icon:        string;
  description: string;
  active:      boolean;
  createdAt:   Date;
  paymentDate: number;
}
