import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity("users")
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { name: "userId" })
  userId!: number; // Usa el modificador `!` para indicar que la propiedad será inicializada

  @Column({ type: "varchar", unique: true, nullable: false })
  username!: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  email!: string;

  @Column({ type: "varchar", nullable: false })
  password: string | null = null;

  @Column({ type: "enum", enum: ["administrator", "user"], default: "user" })
  role!: "administrator" | "user";

  @Column({
    type: "enum",
    enum: ["active", "suspended", "pending"],
    default: "pending",
  })
  status!: "active" | "suspended" | "pending";

  @Column({ type: "varchar", nullable: false })
  name: string | null = null;

  @Column({ type: "varchar", nullable: false })
  lastname: string | null = null;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "createdAt",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "updatedAt",
  })
  updatedAt!: Date;
}
