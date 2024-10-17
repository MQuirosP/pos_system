import { IPurchaseItems } from '@interfaces/purchaseItems.interface';
import { IPurchases } from '@interfaces/purchases.interface';
import { ISaleItem } from '@interfaces/saleItems.interface';
import { ISales } from '@interfaces/sales.interface';

export interface IProduct {
  product_id: number;
  int_code: string;
  name: string;
  description: string;
  purchase_price: number;
  quantity?: number;
  sale_price: number;
  is_taxed: boolean;
  margin: number;
  tax_percentage: number;
  category_id?: number;
  category_name?: string;
  created_at: Date;
  updated_at: Date;
  purchases: IPurchases[]; // Relación Many-to-Many con Purchase
  sales: ISales[]; // Relación Many-to-Many con Sale
  purchase_items: IPurchaseItems[]; // Relación One-to-Many con PurchaseItem
  sale_items: ISaleItem[]; // Relación One-to-Many con SaleItem
}
