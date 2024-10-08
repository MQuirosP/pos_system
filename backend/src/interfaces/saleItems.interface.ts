import { SaleItem } from "@entities/saleItems.entity";
import { Sale } from "@entities/sales.entity";


export interface ISaleItem {
  id: number;
  sale_id: number;
  int_code?: string; 
  sale_price?: number; 
  quantity?: number; 
  sub_total?: number; 
  taxes_amount?: number; 
  created_at: Date;
  updated_at: Date;
  name?: string; 
  total?: number; 
  status: string;
  sale: Sale; 
  sale_items?: SaleItem; 
}

