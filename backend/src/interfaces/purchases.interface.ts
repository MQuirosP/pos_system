export interface IPurchases {
    purchase_id: number;
    provider_id?: number;
    provider_name?: string;
    payment_method?: string;
    doc_number: string;
    sub_total?: number;
    taxes_amount?: number;
    status: string;
    observations?: string;
    total?: number;
    created_at: Date;
    updated_at: Date;
}
