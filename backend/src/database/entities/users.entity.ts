import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Capitalize } from "@decorators/toCapitalize.decorator";
import { ToLowerCase } from "@decorators/toLowerCase.decorator";
import { IUser } from "@interfaces/users.interface";
import { UserRole } from "../../enums/custom.enums";
import { BaseFormattedEntity } from "./BaseFormatedEntity";

@Entity("users")
export class Users extends BaseFormattedEntity implements IUser {
  @PrimaryGeneratedColumn("increment", { name: "user_id" })
  user_id!: number; // Usa el modificador `!` para indicar que la propiedad será inicializada

  @Column({ type: "varchar", unique: true, nullable: false })
  // @ToLowerCase()
  username!: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  // @ToLowerCase()
  email!: string;

  @Column({ type: "varchar", nullable: false })
  password!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.User })
  role!: UserRole;

  @Column({
    type: "boolean",
    default: false,
  })
  is_active!: boolean;

  @Column({ type: "varchar", nullable: false })
  // @Capitalize()
  name!: string;

  @Column({ type: "varchar", nullable: false })
  // @Capitalize()
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

  // @BeforeInsert()
  // @BeforeUpdate()
  // formatFields() {
  //   this.username = this.username.toLowerCase().trim();
  //   this.email = this.email.toLowerCase().trim();
  //   this.name = this.capitalize(this.name);
  //   this.lastname = this.capitalize(this.lastname);
  // }

  // private capitalize(value: string): string {
  //   return value
  //     .toLowerCase()
  //     .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase())
  //     .trim();
  // }
  protected fieldsToLowerCase(): string[] {
      return ["username", "email", "name", "lastname"];
  }

  protected fieldsToCapitalize(): string[] {
      return ["name", "lastname"]
  }
}
