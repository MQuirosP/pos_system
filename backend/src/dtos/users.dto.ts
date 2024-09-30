import {
  IsNotEmpty,
  IsOptional,
  validateOrReject,
  IsString,
  IsEmail,
  ValidateIf,
  IsBoolean,
} from "class-validator";
import { Users } from "../entities/users.entity";
import { USER_KEYS } from "./dtoKeys";
import { DTOBase } from "./DTOBase";
import { IsEnumWithMessage } from "../decorators/isEnumWithMessage.decorator";


export class UserCreateDTO extends DTOBase {
  static expectedKeys: string[] = USER_KEYS;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsEnumWithMessage(["administrator", "user"])
  role!: "administrator" | "user";

  @IsNotEmpty()
  @IsBoolean()
  is_active!: boolean;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  lastname!: string;

  constructor(data: UserCreateDTO) {
    super();
    Object.assign(this, data)
  }

  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}

export class UserUpdateDTO extends DTOBase {
  static expectedKeys = USER_KEYS;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.username !== undefined)
  username?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.email !== undefined)
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.password !== undefined)
  password?: string;

  @IsOptional()
  @IsEnumWithMessage(["administrator", "user"])
  @IsNotEmpty()
  @ValidateIf((o) => o.role !== undefined)
  role?: "administrator" | "user";

  @IsOptional()
  @ValidateIf((o) => o.is_active !== undefined)
  @IsNotEmpty()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.name !== undefined)
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.lastname !== undefined)
  lastname?: string;

  constructor(data: Partial<UserUpdateDTO>) {
    super();
    Object.assign(this, data);
  }

  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}

export class UserResponseDTO {
  username: string;
  name: string;
  lastname: string;
  email: string;
  is_active: boolean;
  created_at: Date;

  constructor(user: Users) {
    this.username = user.username;
    this.name = user.name;
    this.lastname = user.lastname;
    this.email = user.email;
    this.is_active = user.is_active;
    this.created_at = user.created_at;
  }
}
