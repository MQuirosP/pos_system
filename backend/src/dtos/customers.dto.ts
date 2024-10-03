import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  validateOrReject,
} from "class-validator";
import { Customer } from "../database/entities/customers.entity";
import { CUSTOMERS_KEYS } from "./dtoKeys";
import { DTOBase } from "./DTOBase";
import { Inmutable } from "../decorators/isInmmutable.decorator";

export class CustomerCreateDTO extends DTOBase {
  static expectedKeys: string[] = CUSTOMERS_KEYS;

  customer_id!: number;
  created_at!: Date;
  updated_at!: Date;
  sales: any;

  @IsNotEmpty()
  @IsString()
  customer_name!: string;

  @IsNotEmpty()
  @IsString()
  customer_first_lastname!: string;

  @IsNotEmpty()
  @IsString()
  customer_second_lastname!: string;

  @IsNotEmpty()
  @IsString()
  customer_address!: string;

  @IsNotEmpty()
  @IsString()
  customer_phone!: string;

  @IsNotEmpty()
  @IsString()
  customer_email!: string;

  @IsNotEmpty()
  @IsString()
  customer_dni!: string;

  constructor(data: CustomerCreateDTO) {
    super();
   Object.assign(this, data);
  }

  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}

export class CustomerUpdateDTO extends DTOBase {
  static expectedKeys: string[] = CUSTOMERS_KEYS;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.customer_name !== undefined)
  customer_name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.customers_first_lastname !== undefined)
  customer_first_lastname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.customer_second_lastname !== undefined)
  customer_second_lastname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.customer_address !== undefined)
  customer_address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.customer_phone !== undefined)
  customer_phone?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.customer_email !== undefined)
  customer_email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.customer_dni !== undefined)
  @Inmutable({ message: "Customer DNI is inmutable and cannot be changed"})
  customer_dni?: string;

  constructor(data: Partial<CustomerUpdateDTO>) {
    super();
    Object.assign(this, data);
  }

  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}

export class CustomerResponseDTO {
  customer_name: string;
  customer_first_lastname: string;
  customer_second_lastname: string;
  customer_address: string;
  customer_phone: string;
  customer_email: string;
  customer_dni: string;

  constructor(customer: Customer) {
    this.customer_name = customer.customer_name;
    this.customer_first_lastname = customer.customer_first_lastname;
    this.customer_second_lastname = customer.customer_second_lastname;
    this.customer_address = customer.customer_address;
    this.customer_phone = customer.customer_phone;
    this.customer_email = customer.customer_email;
    this.customer_dni = customer.customer_dni;
  }
}
