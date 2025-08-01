import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { Sale } from "@entities/sales.entity";
import { Product } from "@entities/products.entity";
import { ISaleItem } from "@interfaces/saleItems.interface";
import { TransactionStatus } from "@enums/custom.enums";

@Entity("sale_items")
export class SaleItem implements ISaleItem {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "sale_id", type: "int" })
  sale_id!: number;

  // @Column({ name: "product_id", type: "int", nullable: false })
  // product_id!: number;

  @Column({ name: "int_code", type: "varchar", nullable: false })
  int_code!: string;

  @Column({
    name: "sale_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  sale_price!: number;

  @Column({ name: "quantity", type: "float", nullable: false, default: 0.0 })
  quantity!: number;

  @Column({
    name: "sub_total",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  sub_total!: number;

  @Column({
    name: "taxes_amount",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  taxes_amount!: number;

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

  @Column({ name: "name", type: "varchar", nullable: false, default: "" })
  name!: string;

  @Column({
    name: "total",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  total!: number;

  @Column({
    name: "status",
    type: "enum",
    enum: TransactionStatus,
    nullable: false,
    default: TransactionStatus.Completed,
  })
  status!: TransactionStatus;

  @ManyToOne(() => Sale, (sale) => sale.sale_items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "sale_id" })
  sale!: Sale;

  @ManyToOne(() => Product, (product) => product.int_code)
  @JoinColumn({ name: "int_code", referencedColumnName: "int_code" })
  product!: Product;
}
