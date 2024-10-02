import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Customer } from "./customers.entity"; // Asegúrate de ajustar la ruta según sea necesario
import { SaleItem } from "./saleItems.entity";
import { ISales } from "../../interfaces/sales.interface";

@Entity("sales")
export class Sale implements ISales {
  @PrimaryGeneratedColumn({ name: "sale_id" })
  sale_id?: number;

  @Column({ name: "customer_id", type: "int", nullable: false })
  customer_id?: number;

  @Column({ name: "customer_name", type: "varchar" })
  customer_name!: string;

  @Column({ name: "payment_method", type: "varchar", nullable: false })
  payment_method!: string;

  @Column({ name: "doc_number", type: "varchar", unique: false })
  doc_number!: string;

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

  @Column({ name: "status", type: "varchar", nullable: false })
  status!: string;

  @Column({ name: "observations", type: "text", nullable: true })
  observations!: string;

  @Column({
    name: "sub_total",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  sub_total!: number;

  @Column({
    name: "taxes_amount",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  taxes_amount!: number;

  @Column({
    name: "total",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  total!: number;

  // Relación Many-to-One con Customer
  @ManyToOne(() => Customer, (customer) => customer.sales, { 
    onDelete: "SET NULL" })
  @JoinColumn({ name: "customer_id" })
  customer?: Customer;

  @OneToMany(() => SaleItem, (saleItem) => saleItem.sale, {
    cascade: true,
    eager: true,
  })
  sale_items!: SaleItem[];

}
