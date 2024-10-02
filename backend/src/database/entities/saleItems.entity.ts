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
import { ISaleItems } from "../../interfaces/saleItems.interface";

@Entity("sale_items")
export class SaleItem implements ISaleItems {
  @PrimaryGeneratedColumn({ name: "sequence" })
  sequence!: number;

  @Column({ name: "status", type: "varchar", nullable: false, default: "completed" })
  status?: string;

  @Column({ name: "sale_id", type: "int" })
  sale_id?: number;

  @Column({ name: "int_code", type: "varchar", nullable: true })
  int_code?: string;

  @Column({
    name: "sale_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  sale_price?: number;

  @Column({ name: "quantity", type: "float", nullable: true })
  quantity?: number;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at?: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at?: Date;

  @Column({ name: "name", type: "varchar", nullable: true })
  name?: string;

  @Column({
    name: "sub_total",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  sub_total?: number;

  @Column({
    name: "taxes_amount",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  taxes_amount?: number;

  @Column({
    name: "total",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  total?: number;

  @ManyToOne(() => Sale, (sale) => sale.sale_items, { 
    onDelete: "SET NULL" })
  @JoinColumn({ name: "sale_id" })
  sale?: Sale;

  @ManyToOne(() => Product, (product) => product.sale_items, {
    onDelete: "SET NULL" })
  @JoinColumn({ name: "int_code" })
  product?: Product;
}
