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
import { IsEnumWithMessage } from "../decorators/isEnumWithMessage";


export class UserCreateDTO extends DTOBase {
  static expectedKeys: string[] = USER_KEYS;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnumWithMessage(["administrator", "user"])
  role: "administrator" | "user";

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  constructor(data: {
    username: string;
    email: string;
    password: string;
    role: "administrator" | "user";
    status: boolean;
    name: string;
    lastname: string;
  }) {
    super();
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.status = data.status;
    this.name = data.name;
    this.lastname = data.lastname;
  }

  async validate() {
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
  @ValidateIf((o) => o.status !== undefined)
  @IsNotEmpty()
  @IsBoolean()
  status?: boolean;

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

  async validate() {
    await validateOrReject(this);
  }
}

export class UserResponseDTO {
  username: string;
  email: string;
  created_at: Date;

  constructor(user: Users) {
    this.username = user.username;
    this.email = user.email;
    this.created_at = user.created_at;
  }
}
