export interface IUser {
    user_id?: number;
    username: string;
    email: string;
    password: string;
    role: "administrator" | "user";
    is_active: boolean;
    name: string;
    lastname: string;
    created_at?: Date;
    updated_at?: Date;
}