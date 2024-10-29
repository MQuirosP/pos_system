import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { SaleItem } from "@entities/saleItems.entity";
import { PurchaseItem } from "@entities/purchaseItems.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn({ name: "product_id" })
  product_id!: number;

  @Column({ name: "int_code", type: "varchar", unique: true, nullable: false })
  int_code!: string;

  @Column({ name: "name", type: "varchar", nullable: false })
  name!: string;

  @Column({ name: "description", type: "varchar", nullable: false })
  description!: string;

  @Column({
    name: "purchase_price",
    type: "decimal",
    precision: 10,
    scale: 5,
    nullable: false,
  })
  purchase_price!: number;

  @Column({
    name: "quantity",
    type: "decimal",
    precision: 10,
    scale: 5,
    nullable: false,
  })
  quantity?: number;

  @Column({
    name: "sale_price",
    type: "decimal",
    precision: 10,
    scale: 5,
    nullable: false,
  })
  sale_price!: number;

  @Column({ name: "is_taxed", type: "boolean", nullable: false })
  is_taxed!: boolean;

  @Column({
    name: "margin",
    type: "decimal",
    precision: 10,
    scale: 5,
    nullable: false,
  })
  margin!: number;

  @Column({
    name: "tax_percentage",
    type: "decimal",
    precision: 10,
    scale: 5,
    nullable: false,
  })
  tax_percentage!: number;

  @Column({ name: "category_id", type: "int", nullable: false })
  category_id!: number;

  @Column({ name: "category_name", type: "varchar", nullable: false })
  category_name!: string;

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

  @OneToMany(() => SaleItem, (saleItem) => saleItem.product, { cascade: true })
  sale_items!: SaleItem[];

  @OneToMany(() => PurchaseItem, (purchaseItem) => purchaseItem.product, {
    cascade: true,
  })
  purchase_items!: PurchaseItem[];
}
