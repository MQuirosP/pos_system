import { ICustomers } from "@interfaces/customers.interface";
import { ISaleItem } from "@interfaces/saleItems.interface";
import { PaymentMethod, TransactionStatus } from "@enums/custom.enums";

export interface ISales {
  sale_id?: number;
  customer_id?: number;
  customer_name: string;
  payment_method: PaymentMethod;
  doc_number: string;
  created_at: Date;
  updated_at: Date;
  status: TransactionStatus;
  observations?: string; // Opcional
  sub_total: number;
  taxes_amount: number;
  total: number;
  customer?: ICustomers; // Relación opcional
  sale_items: ISaleItem[]; // Relación obligatoria
}
