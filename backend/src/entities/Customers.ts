import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Sale } from "./Sales";

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn({ name: "customer_id" })
  customerId!: number;

  @Column({
    name: "customer_name",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  customerName?: string;

  @Column({
    name: "customer_first_lastname",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  customerFirstLastname?: string;

  @Column({
    name: "customer_second_lastname",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  customerSecondLastname?: string;

  @Column({
    name: "customer_address",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  customerAddress!: string;

  @Column({
    name: "customer_phone",
    type: "varchar",
    length: 20,
    nullable: false,
  })
  customerPhone!: string;

  @Column({
    name: "customer_email",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  customerEmail!: string;

  @Column({
    name: "customer_dni",
    type: "varchar",
    length: 20,
    nullable: false,
    unique: false,
  })
  customerDni?: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  @OneToMany(() => Sale, sale => sale.customer)
    sales!: Sale[];
}
