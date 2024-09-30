import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Purchase } from "./purchases.entity";
import { Product } from "./products.entity";
import { IPurchaseItems } from "../../interfaces/purchaseItems.interface";
import { IPurchases } from "../../interfaces/purchases.interface";

@Entity("purchase_items")
export class PurchaseItem implements IPurchaseItems {
  @PrimaryGeneratedColumn({ name: "sequence" })
  sequence!: number;

  @Column({ name: "purchase_id", type: "int" })
  purchase_id!: number;

  @Column({ name: "int_code", type: "varchar" })
  int_code!: string;

  @Column({
    name: "purchase_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  purchase_price?: number;

  @Column({ name: "quantity", type: "float" })
  quantity!: number;

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
    name: "total",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  total?: number;

  @Column({ name: "status", type: "varchar", nullable: false })
  status!: string;

  @ManyToOne(() => Purchase, (purchase) => purchase.products, {
    onDelete: "SET NULL" })
  @JoinColumn({ name: "purchase_id" })
  purchase!: Purchase;

  @ManyToOne(() => Product, (product) => product.purchase_items, {
    onDelete: "SET NULL" })
  @JoinColumn({ name: "int_code" })
  product!: Product;
}
