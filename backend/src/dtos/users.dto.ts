import { UserRole } from '@entities/users.entity';
import { convertToLocalTime } from '@utils/dateUtils';
import {
  IsNotEmpty,
  IsOptional,
  validateOrReject,
  IsString,
  IsEmail,
  IsBoolean,
} from "class-validator";
import { Users } from "@entities/users.entity";
import { USER_KEYS } from "./dtoKeys";
import { DTOBase } from "./DTOBase";
import { IsEnumWithMessage } from "@decorators/isEnumWithMessage.decorator";
import { Inmutable } from "@decorators/isInmmutable.decorator";


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

  @IsOptional()
  @IsEnumWithMessage(UserRole)
  role?: UserRole;

  @IsOptional()
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
  @Inmutable()
  username?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnumWithMessage(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
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
  username?: string;
  fullname: string;
  email: string;
  role: "administrator" | "user";
  is_active: boolean;
  created_at: Date | string;

  constructor(user: Users) {
    // this.username = user.username;
    this.fullname = `${user.lastname}, ${user.name}`;
    // this.lastname = user.lastname;
    this.email = user.email;
    this.role = user.role;
    this.is_active = user.is_active;
    this.created_at = convertToLocalTime(user.created_at);
  }
}
