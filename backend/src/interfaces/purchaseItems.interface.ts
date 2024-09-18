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
    name?: string;
    total?: number;
    status: string;
    purchase_items?: IPurchaseItems[];
}
