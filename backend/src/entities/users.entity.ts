import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { Capitalize } from "../decorators/toCapitalize.decorator";
import { ToLowerCase } from "../decorators/toLowerCase.decorator";

@Entity("users")
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { name: "user_id" })
  user_id!: number; // Usa el modificador `!` para indicar que la propiedad será inicializada

  @Column({ type: "varchar", unique: true, nullable: false })
  @ToLowerCase()
  username!: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  @ToLowerCase()
  email!: string;

  @Column({ type: "varchar", nullable: false })
  password: string | null = null;

  @Column({ type: "enum", enum: ["administrator", "user"], default: "user" })
  role!: "administrator" | "user";

  @Column({
    type: "boolean",
    default: false,
  })
  status!: boolean;

  @Column({ type: "varchar", nullable: false })
  @Capitalize()
  name!: string;

  @Column({ type: "varchar", nullable: false })
  @Capitalize()
  lastname!: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updated_at!: Date;
}
