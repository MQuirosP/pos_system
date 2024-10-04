// Archivo: purchaseItems.interface.ts
import { Purchase } from "../database/entities/purchases.entity";
import { PurchaseItem } from "../database/entities/purchaseItems.entity";

export interface IPurchaseItems {
  id: number;
  purchase_id: number;
  int_code?: string;
  purchase_price?: number;
  quantity?: number;
  sub_total?: number;
  taxes_amount?: number;
  created_at: Date;
  updated_at: Date;
  name?: string;
  total?: number;
  status: string;
  purchase: Purchase; // Relación obligatoria
  purchase_items?: PurchaseItem; // Relación opcional
}
