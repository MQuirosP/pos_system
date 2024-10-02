export interface IPurchaseItems {
    sequence: number;
    status: string;
    purchase_id: number;
    int_code: string;
    name?: string;
    quantity: number;
    purchase_price?: number;
    sub_total?: number;
    taxes_amount?: number;
    total?: number;
    created_at: Date;
    updated_at: Date;
}
