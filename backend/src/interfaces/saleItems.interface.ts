export interface ISaleItems {
    sequence: number;
    status?: string;
    sale_id: number;
    int_code: string;
    sale_price?: number;
    quantity?: number;
    created_at: Date;
    updated_at: Date;
    name?: string;
    sub_total?: number;
    taxes_amount?: number;
    total?: number;
}
