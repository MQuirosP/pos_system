import { UserRole } from "@enums/custom.enums";

export interface IUser {
    user_id: number; 
    username: string; 
    email: string; 
    password: string; 
    role: UserRole; 
    is_active: boolean; 
    name: string; 
    lastname: string; 
    created_at: Date; 
    updated_at: Date; 
  }
  