import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchase } from "@entities/purchases.entity";
import { Product } from "@entities/products.entity";
import { IPurchaseItems } from "@interfaces/purchaseItems.interface";
import { TransactionStatus } from "@enums/custom.enums";

@Entity("purchase_items")
export class PurchaseItem implements IPurchaseItems {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "purchase_id", type: "int" })
  purchase_id!: number;

  // @Column({ name: "product_id", type: "int", nullable: false })
  // product_id!: number;

  @Column({ name: "int_code", type: "varchar", nullable: false })
  int_code!: string;

  @Column({
    name: "purchase_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  purchase_price!: number;

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

  @ManyToOne(() => Purchase, (purchase) => purchase.purchase_items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "purchase_id" })
  purchase!: Purchase;

  @ManyToOne(() => Product, (product) => product.int_code)
  @JoinColumn({ name: "int_code", referencedColumnName: "int_code" })
  product!: Product;
}
