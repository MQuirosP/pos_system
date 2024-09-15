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
    category_id: number;
    category_name?: string;
    created_at: Date;
    updated_at: Date;
}
