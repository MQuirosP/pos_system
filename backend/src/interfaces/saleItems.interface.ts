export interface ISaleItems {
  sequence?: number;
  status?: string;
  sale_id?: number;
  int_code?: string;
  name?: string;
  quantity?: number;
  sale_price?: number;
  sub_total?: number;
  taxes_amount?: number;
  total?: number;
  created_at?: Date;
  updated_at?: Date;
}
