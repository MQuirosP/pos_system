import { ICustomers } from '../../interfaces/customers.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Sale } from "./sales.entity";

@Entity("customers")
export class Customer implements ICustomers{
  @PrimaryGeneratedColumn({ name: "customer_id" })
  customer_id!: number;

  @Column({
    name: "customer_name",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  customer_name?: string;

  @Column({
    name: "customer_first_lastname",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  customer_first_lastname?: string;

  @Column({
    name: "customer_second_lastname",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  customer_second_lastname?: string;

  @Column({
    name: "customer_address",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  customer_address!: string;

  @Column({
    name: "customer_phone",
    type: "varchar",
    length: 20,
    nullable: true,
  })
  customer_phone!: string;

  @Column({
    name: "customer_email",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  customer_email!: string;

  @Column({
    name: "customer_dni",
    type: "varchar",
    length: 20,
    nullable: true,
    unique: true,
  })
  customer_dni?: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;

  @OneToMany(() => Sale, sale => sale.customer)
    sales!: Sale[];
}
