import { IsEmail, IsNotEmpty, IsString, validateOrReject } from "class-validator";
import { DTOBase } from "./DTOBase";
import { USER_LOGIN_KEYS } from "./dtoKeys";

export class UserRegisterDTO extends DTOBase {
    
    @IsNotEmpty()
    @IsString()
    username!: string;
    
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;

    constructor(data: any) {
        super();
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
    }
    
    async validate(): Promise<void> {
        await validateOrReject(this);;
    }
}

export class UserLoginDTO extends DTOBase {
    static expectedKeys: string[] = USER_LOGIN_KEYS;
    
    @IsNotEmpty()
    @IsString()
    username!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;

    constructor(data: any) {
        super();
        Object.assign(this, data);
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}