import { Sale } from "../database/entities/sales.entity";
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
  validateOrReject,
} from "class-validator";
import { DTOBase } from "./DTOBase";
import { SALE_KEYS, SALEITEMS_KEYS } from "./dtoKeys";
import { Type } from "class-transformer";
import { convertToLocalTime } from "../utils/dateUtils";

export class SaleCreateDTO extends DTOBase {
  static expectedKeys: string[] = SALE_KEYS;

  @IsNotEmpty()
  @IsNumber()
  customer_id!: number;

  @IsNotEmpty()
  @IsString()
  customer_name!: string;

  @IsNotEmpty()
  @IsString()
  payment_method!: string;

  @IsNotEmpty()
  @IsString()
  doc_number!: string;

  @IsNotEmpty()
  @IsString()
  status!: string;

  @IsString()
  @IsOptional()
  observations!: string;

  @IsNotEmpty()
  @IsNumber()
  sub_total!: number;

  @IsNotEmpty()
  @IsNumber()
  taxes_amount!: number;

  @IsNotEmpty()
  @IsNumber()
  total!: number;

  @IsOptional()
  created_at!: Date;

  @IsOptional()
  updated_at!: Date;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleItemDTO)
  sale_items!: CreateSaleItemDTO[];

  constructor(data: Partial<SaleCreateDTO>) {
    super();
    Object.assign(this, data);
    if (data.sale_items) {
      this.sale_items = data.sale_items?.map(
        (item) => new CreateSaleItemDTO(item)
      );
    }
  }

  async validate(): Promise<void> {
    await validateOrReject(this);
    if (this.sale_items) {
      await Promise.all(this.sale_items.map((item) => item.validate()));
    }
  }
}

export class SaleResponseDto {
  sale_id!: number;
  customer_name!: string;
  doc_number!: string;
  total!: number;
  status!: string;
  created_at!: string | Date;
  sale_items: CreateSaleItemDTO[];

  constructor(data: Sale) {
    this.customer_name = data.customer_name;
    this.doc_number = data.doc_number;
    this.total = data.total;
    this.status = data.status;
    this.created_at = convertToLocalTime(data.created_at);
    this.sale_items = data.sale_items.map(
      (product) =>
        new CreateSaleItemDTO({
          int_code: product.int_code,
          name: product.name,
          // status: this.status,
          quantity: product.quantity,
          sale_price: product.sale_price,
          sub_total: product.sub_total,
          taxes_amount: product.taxes_amount,
          total: product.total,
        })
    );
  }
}

export class CreateSaleItemDTO extends DTOBase {
  static expectedKeys: string[] = SALEITEMS_KEYS;

  @IsOptional()
  @IsNumber()
  id!: number;
  
  @IsOptional()
  @IsNumber()
  sale!: Sale;

  @IsOptional()
  sale_id!: number;

  @IsOptional()
  created_at!: Date;

  @IsOptional()
  updated_at!: Date;

  @IsNotEmpty()
  @IsString()
  int_code!: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((obj) => obj.name !== null && obj.name !== undefined)
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;

  @IsOptional()
  @IsString()
  status!: string;

  @IsNotEmpty()
  @IsNumber()
  sale_price!: number;

  @IsNotEmpty()
  @IsNumber()
  sub_total?: number;

  @IsNotEmpty()
  @IsNumber()
  taxes_amount?: number;

  @IsNotEmpty()
  @IsNumber()
  total?: number;

  constructor(data: Partial<CreateSaleItemDTO>) {
    super();
    Object.assign(this, data);
  }

  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}

export class SaleUpdateDTO extends DTOBase {
  static expectedKeys = SALE_KEYS;

  @IsString()
  @ValidateIf((o) => o.status !== undefined)
  @IsNotEmpty()
  status!: boolean;

  constructor(data: Partial<SaleUpdateDTO>) {
    super();
    Object.assign(this, data);
  }

  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
