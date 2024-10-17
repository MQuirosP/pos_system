import { ICustomers } from "@interfaces/customers.interface";
import { ISaleItem } from "@interfaces/saleItems.interface";

// Archivo: sales.interface.ts
export interface ISales {
  sale_id?: number;
  customer_id?: number;
  customer_name: string;
  payment_method: string;
  doc_number: string;
  created_at: Date;
  updated_at: Date;
  status: string;
  observations?: string; // Opcional
  sub_total: number;
  taxes_amount: number;
  total: number;
  customer?: ICustomers; // Relación opcional
  sale_items: ISaleItem[]; // Relación obligatoria
}
