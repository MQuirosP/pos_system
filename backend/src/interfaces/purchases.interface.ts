// Archivo: purchases.interface.ts
import { IProviders } from "@interfaces/providers.interface";
import { IPurchaseItems } from "@interfaces/purchaseItems.interface";
import { PaymentMethod, TransactionStatus } from "@enums/custom.enums";

export interface IPurchases {
  purchase_id?: number;
  provider_id?: number;
  provider_name: string;
  payment_method: PaymentMethod;
  doc_number: string;
  created_at: Date;
  updated_at: Date;
  status: TransactionStatus;
  observations?: string;
  sub_total: number;
  taxes_amount: number;
  total: number;
  provider?: IProviders; // Relación obligatoria
  purchase_items: IPurchaseItems[]; // Relación obligatoria
}
