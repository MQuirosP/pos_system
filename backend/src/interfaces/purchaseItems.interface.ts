// Archivo: purchaseItems.interface.ts
import { IPurchases } from "./purchases.interface";
import { IProduct } from "./products.interface";

export interface IPurchaseItems {
  sequence: number;
  purchase_id: number;
  int_code: string;
  purchase_price?: number;
  quantity: number;
  sub_total?: number;
  taxes_amount?: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  total: number;
  status: string;
  purchase: IPurchases; // Relación obligatoria
  purchase_items?: IProduct; // Relación opcional
}
