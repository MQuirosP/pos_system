import { SaleItem } from "@entities/saleItems.entity";
import { Sale } from "@entities/sales.entity";
import { TransactionStatus } from "@enums/custom.enums";


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
  status?: TransactionStatus;
  sale: Sale; 
  sale_items?: SaleItem; 
}

