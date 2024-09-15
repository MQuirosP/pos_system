export interface ICustomers {
    customer_id: number;
    customer_name?: string;
    customer_first_lastname?: string;
    customer_second_lastname?: string;
    customer_address: string;
    customer_phone: string;
    customer_email: string;
    customer_dni?: string;
    created_at: Date;
    updated_at: Date;
}
