// src/entities/User.ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('Users') // Nombre de la tabla existente
export class Users {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  name: string | undefined;

  @Column()
  email: string | undefined;
}
