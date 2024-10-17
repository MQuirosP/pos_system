import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { Provider } from "@entities/providers.entity";
import { IPurchases } from "@interfaces/purchases.interface";
import { PurchaseItem } from "@entities/purchaseItems.entity";

@Entity("purchases")
export class Purchase implements IPurchases {
  @PrimaryGeneratedColumn({ name: "purchase_id" })
  purchase_id!: number;

  @Column({ name: "provider_id", type: "int", nullable: false })
  provider_id!: number;

  @Column({ name: "provider_name", type: "varchar", nullable: false })
  provider_name!: string;

  @Column({ name: "payment_method", type: "varchar", nullable: false })
  payment_method!: string;

  @Column({ name: "doc_number", type: "varchar", nullable: false })
  doc_number!: string;

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

  @Column({ name: "status", type: "varchar", nullable: false })
  status!: string;

  @Column({ name: "observations", type: "text", nullable: false })
  observations!: string;

  @Column({
    name: "total",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  total!: number;

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

  @ManyToOne(() => Provider, (provider) => provider.purchases, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "provider_id" })
  provider!: Provider;

  @ManyToMany(() => PurchaseItem, (purchaseItem) => purchaseItem.purchase, {
    cascade: true,
  })
  purchase_items!: PurchaseItem[];

}
