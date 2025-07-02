export const USER_KEYS = [
  "username",
  "email",
  "password",
  "role",
  "is_active",
  "name",
  "lastname",
];

export const PRODUCT_KEYS = [
  "int_code",
  "name",
  "description",
  "purchase_price",
  "quantity",
  "sale_price",
  "is_taxed",
  "margin",
  "tax_percentage",
  "category_id",
  "category_name",
];

export const SALE_KEYS = [
  "customer_id",
  "customer_name",
  "payment_method",
  "doc_number",
  "status",
  "observations",
  "sub_total",
  "taxes_amount",
  "total",
  "sale_items",
];

export const PURCHASE_KEYS = [
  "provider_id",
  "provider_name",
  "payment_method",
  "doc_number",
  "status",
  "observations",
  "sub_total",
  "taxes_amount",
  "total",
  "purchase_items",
];

export const SALEITEMS_KEYS = [
  "int_code",
  "name",
  "quantity",
  "sale_price",
  "sub_total",
  "taxes_amount",
  "total",
];

export const PURCHASEITEMS_KEYS = [
  "int_code",
  "name",
  "quantity",
  "purchase_price",
  "sub_total",
  "taxes_amount",
  "total",
];

export const CUSTOMERS_KEYS = [
  "customer_name",
  "customer_first_lastname",
  "customer_second_lastname",
  "customer_address",
  "customer_phone",
  "customer_email",
  "customer_dni",
];

export const PROVIDERS_KEYS = [
  "provider_name",
  "provider_address",
  "provider_phone",
  "provider_email",
  "provider_dni",
];

export const USER_LOGIN_KEYS = [
  "username",
  "password",
];

export const USER_REGISTER_KEYS = [
  "username",
  "email",
  "password",
];
