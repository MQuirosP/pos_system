import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Sale } from "./sales.entity";
import { Product } from "./products.entity";
import { ISaleItems } from "../interfaces/saleItems.interface";
import { ISales } from "../interfaces/sales.interface";
import { IProduct } from "../interfaces/products.interface";

@Entity("sale_items")
export class SaleItem implements ISaleItems {
  @PrimaryGeneratedColumn({ name: "sequence" })
  sequence!: number;

  @Column({ name: "status", type: "varchar", nullable: false })
  status?: string;

  @Column({ name: "sale_id", type: "int" })
  sale_id?: number;

  @Column({ name: "int_code", type: "varchar" })
  int_code?: string;

  @Column({
    name: "sale_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  sale_price?: number;

  @Column({ name: "quantity", type: "float", nullable: false })
  quantity?: number;

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

  @Column({ name: "name", type: "varchar", nullable: false })
  name?: string;

  @Column({
    name: "sub_total",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  sub_total?: number;

  @Column({
    name: "taxes_amount",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  taxes_amount?: number;

  @Column({
    name: "total",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  total?: number;

  @ManyToOne(() => Sale, (sale) => sale.products, { onDelete: "SET NULL" })
  @JoinColumn({ name: "sale_id" })
  sale?: ISales;

  @ManyToOne(() => Product, (product) => product.products, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "int_code" })
  product?: IProduct;
}
