import { CreateSaleItemDTO } from "../dtos/sales.dto";

export interface ISales {
    sale_id: number;
    customer_id: number;
    customer_name: string;
    payment_method?: string;
    doc_number: string;
    created_at: Date;
    updated_at: Date;
    status?: string;
    observations?: string;
    sub_total: number;
    taxes_amount: number;
    total: number;
    products: CreateSaleItemDTO[];
}
