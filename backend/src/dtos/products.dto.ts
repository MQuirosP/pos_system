import {
  IsNotEmpty,
  IsOptional,
  validateOrReject,
  IsString,
  ValidateIf,
  IsBoolean,
  IsNumber,
} from "class-validator";
import { Product } from "@entities/products.entity";
import { PRODUCT_KEYS } from "./dtoKeys";
import { DTOBase } from "./DTOBase";
import { Inmutable } from "@decorators/isInmmutable.decorator";

export class ProductCreateDTO extends DTOBase {
  static expectedKeys: string[] = PRODUCT_KEYS;

  @IsNotEmpty()
  @IsString()
  int_code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  purchase_price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  sale_price: number;

  @IsNotEmpty()
  @IsBoolean()
  is_taxed: boolean;

  @IsNotEmpty()
  @IsNumber()
  margin: number;

  @IsNotEmpty()
  @IsNumber()
  tax_percentage: number;

  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsNotEmpty()
  @IsString()
  category_name: string;

  constructor(data: {
    int_code: string;
    name: string;
    description: string;
    purchase_price: number;
    quantity: number;
    sale_price: number;
    is_taxed: boolean;
    margin: number;
    tax_percentage: number;
    category_id: number;
    category_name: string;
  }) {
    super();
    this.int_code = data.int_code;
    this.name = data.name;
    this.description = data.description;
    this.purchase_price = data.purchase_price;
    this.quantity = data.quantity;
    this.sale_price = data.sale_price;
    this.is_taxed = data.is_taxed;
    this.margin = data.margin;
    this.tax_percentage = data.tax_percentage;
    this.category_id = data.category_id;
    this.category_name = data.category_name;
  }

  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}

export class ProductUpdateDTO extends DTOBase {
  static expectedKeys: string[] = PRODUCT_KEYS;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Inmutable({ message: "Product int_code is inmutable and cannot be changed"})
  int_code?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  purchase_price?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  sale_price?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  is_taxed?: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  margin?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  tax_percentage?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  category_id?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category_name?: string;

  constructor(data: Partial<ProductUpdateDTO>) {
    super();
    Object.assign(this, data);
  }

  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}

export class ProductResponseDTO {
  int_code: string;
  name: string;
  description: string;
  purchase_price: number;
  quantity?: number;
  sale_price: number;
  tax_percentage: number;
  category_name: string;

  constructor(product: Product) {
    this.int_code = product.int_code;
    this.name = product.name;
    this.description = product.description;
    this.purchase_price = product.purchase_price;
    this.sale_price = product.sale_price;
    this.quantity = product.quantity;
    this.tax_percentage = product.tax_percentage;
    this.category_name = product.category_name;
  }
}
