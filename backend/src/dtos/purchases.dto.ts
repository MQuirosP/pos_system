import { Purchase } from "@entities/purchases.entity";
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  validateOrReject,
} from "class-validator";
import { DTOBase } from "@dtos/DTOBase";
import { PURCHASE_KEYS, PURCHASEITEMS_KEYS } from "@dtos/dtoKeys";
import { Type } from "class-transformer";
import { convertToLocalTime } from "@utils/dateUtils";
import { Product } from "@entities/products.entity";
import { PaymentMethod, TransactionStatus } from "@enums/custom.enums";
import { IsEnumWithMessage } from "@decorators/isEnumWithMessage.decorator";

export class PurchaseCreateDTO extends DTOBase {
  static expectedKeys: string[] = PURCHASE_KEYS;

  @IsNotEmpty()
  @IsNumber()
  provider_id!: number;

  @IsNotEmpty()
  @IsString()
  provider_name!: string;

  @IsNotEmpty()
  @IsEnumWithMessage(PaymentMethod)
  payment_method!: PaymentMethod;

  @IsNotEmpty()
  @IsString()
  doc_number!: string;

  @IsNotEmpty()
  @IsEnumWithMessage(TransactionStatus)
  status!: TransactionStatus;

  @IsOptional()
  @IsString()
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
  @Type(() => CreatePurchaseItemDTO)
  purchase_items!: CreatePurchaseItemDTO[];

  constructor(data: Partial<PurchaseCreateDTO>) {
    super();
    Object.assign(this, data);
    if (data.purchase_items) {
      this.purchase_items = data.purchase_items?.map(
        (item) => new CreatePurchaseItemDTO(item)
      );
    }
  }

  async validate(): Promise<void> {
    await validateOrReject(this);
    if (this.purchase_items) {
      await Promise.all(this.purchase_items.map((item) => item.validate()));
    }
  }
}

export class PurchaseResponseDTO {
  purchase_id!: number;
  provider_name!: string;
  doc_number!: string;
  total!: number;
  status!: TransactionStatus;
  created_at!: string | Date;
  purchase_items: CreatePurchaseItemDTO[];

  constructor(data: Purchase) {
    this.provider_name = data.provider_name;
    this.doc_number = data.doc_number;
    this.total = data.total;
    this.status = data.status;
    this.created_at = convertToLocalTime(data.created_at);
    this.purchase_items = data.purchase_items.map(
      (product) =>
        new CreatePurchaseItemDTO({
          int_code: product.int_code,
          name: product.name,
          quantity: product.quantity,
          purchase_price: product.purchase_price,
          sub_total: product.sub_total,
          taxes_amount: product.taxes_amount,
          total: product.total,
        })
    );
  }
}

export class CreatePurchaseItemDTO extends DTOBase {
  static expectedKeys: string[] = PURCHASEITEMS_KEYS;

  @IsOptional()
  @IsNumber()
  product_id!: number;

  @IsOptional()
  @IsNumber()
  id!: number;

  @IsOptional()
  @IsNumber()
  purchase!: Purchase;

  @IsOptional()
  @IsNumber()
  purchase_id!: number;

  @IsOptional()
  created_at!: Date;

  @IsOptional()
  updated_at!: Date;

  @IsNotEmpty()
  @IsString()
  int_code!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;

  @IsOptional()
  @IsString()
  status!: TransactionStatus;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  product!: Product;

  @IsNotEmpty()
  @IsNumber()
  purchase_price!: number;

  @IsNotEmpty()
  @IsNumber()
  sub_total!: number;

  @IsNotEmpty()
  @IsNumber()
  taxes_amount!: number;

  @IsNotEmpty()
  @IsNumber()
  total!: number;

  constructor(data: Partial<CreatePurchaseItemDTO>) {
    super();
    Object.assign(this, data);
  }

  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}

export class PurchaseUpdateDTO extends DTOBase {
  static expectedKeys: string[] = ["status"];

  @IsEnumWithMessage(TransactionStatus)
  status!: TransactionStatus;

  constructor(data: { status: TransactionStatus }) {
    super();
    this.status = data.status;
  }

  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
