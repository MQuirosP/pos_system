import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Sale } from "./sales.entity";
import { SaleItem } from "./saleItems.entity";
import { Purchase } from "./purchases.entity";
import { PurchaseItem } from "./purchaseItems.entity";
import { IProduct } from "../../interfaces/products.interface";

@Entity("products")
export class Product implements IProduct {
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
    nullable: true,
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

  @Column({ name: "category_name", type: "varchar", nullable: true })
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

  // Relación Many-to-Many con Purchase
  @ManyToMany(() => Purchase, (purchase) => purchase.products)
  @JoinTable({
    name: "purchase_items", // Tabla intermedia para productos y compras
    joinColumn: { name: "product_id", referencedColumnName: "product_id" },
    inverseJoinColumn: {
      name: "purchase_id",
      referencedColumnName: "purchase_id",
    },
  })
  purchases!: Purchase[];
  @OneToMany(() => PurchaseItem, (purchaseItem) => purchaseItem.product)
  purchase_items!: PurchaseItem[];

  // Relación Many-to-Many con Sale
  // Product
  @ManyToMany(() => Sale, (sale) => sale.products)
  @JoinTable({
    name: "sale_items",
    joinColumn: { name: "product_id", referencedColumnName: "product_id" },
    inverseJoinColumn: { name: "sale_id", referencedColumnName: "sale_id" },
  })
  sales!: Sale[];

  @OneToMany(() => SaleItem, (saleItem) => saleItem.product)
  products!: SaleItem[];
}
// export { Sale };
