import { validateOrReject } from "class-validator";
import { Users } from "../entities/Users";

export class UserCreateDTO {
    username: string;
    email: string;
    password: string;
    role: 'administrator' | 'user';
    status: 'active' | 'suspended' | 'pending';
    name: string;
    lastname: string;

    constructor(data: {
        username: string;
        email: string;
        password: string;
        role: 'administrator' | 'user';
        status: 'active' | 'suspended' | 'pending';
        name: string;
        lastname: string;
    }) {
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role;
        this.status = data.status;
        this.name = data.name;
        this.lastname = data.lastname;
    }

    async validate() {
        await validateOrReject(this)
    }
}

export class UserResponseDTO {
    username: string;
    email: string;
    createdAt: Date;

    constructor(user: Users) {
        this.username = user.username;
        this.email = user.email;
        this.createdAt = user.createdAt;
    }
}
