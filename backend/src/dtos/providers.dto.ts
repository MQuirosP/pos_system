import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateOrReject,
} from "class-validator";
import { Provider } from "@entities/providers.entity";
import { PROVIDERS_KEYS } from "@dtos/dtoKeys";
import { DTOBase } from "@dtos/DTOBase";
import { Inmutable } from "@decorators/isInmmutable.decorator";
import { Purchase } from "@entities/purchases.entity";

export class ProviderCreateDTO extends DTOBase {
  static expectedKeys: string[] = PROVIDERS_KEYS;

  @IsOptional()
  provider_id?: number;

  @IsOptional()
  created_at?: Date;

  @IsOptional()
  updated_at?: Date;

  @IsOptional()
  purchases!: Purchase[];

  @IsNotEmpty()
  @IsString()
  provider_name!: string;

  @IsNotEmpty()
  @IsString()
  provider_address!: string;

  @IsNotEmpty()
  @IsEmail()
  provider_email!: string;

  @IsNotEmpty()
  @IsString()
  provider_phone!: string;

  @IsNotEmpty()
  @IsString()
  provider_dni!: string;

  constructor(data: ProviderCreateDTO) {
    super();
    Object.assign(this, data);
  }
  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}

export class ProviderUpdateDTO extends DTOBase {
  static expectedKeys: string[] = PROVIDERS_KEYS;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  provider_name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  provider_address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  provider_phone?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  provider_email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Inmutable({ message: "Provider DNI is inmutable and cannot be changed." })
  provider_dni?: string;

  constructor(data: Partial<ProviderUpdateDTO>) {
    super();
    Object.assign(this, data);
  }

  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}

export class ProviderResponseDTO {
  provider_name: string;
  provider_address: string;
  provider_phone: string;
  provider_email: string;
  provider_dni: string;

  constructor(provider: Provider) {
    this.provider_name = provider.provider_name;
    this.provider_address = provider.provider_address;
    this.provider_phone = provider.provider_phone;
    this.provider_email = provider.provider_email;
    this.provider_dni = provider.provider_dni;
  }
}
