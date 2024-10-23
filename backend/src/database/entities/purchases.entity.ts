import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Provider } from "@entities/providers.entity";
import { PurchaseItem } from "@entities/purchaseItems.entity";
import { IPurchases } from "@interfaces/purchases.interface";
import { PaymentMethod, TransactionStatus } from "@enums/custom.enums";

@Entity("purchases")
export class Purchase implements IPurchases {
  @PrimaryGeneratedColumn({ name: "purchase_id" })
  purchase_id?: number;

  @Column({ name: "provider_id", type: "int", nullable: false })
  provider_id?: number;

  @Column({ name: "provider_name", type: "varchar", nullable: false })
  provider_name!: string;

  @Column({
    name: "payment_method",
    type: "enum",
    enum: PaymentMethod,
    nullable: false,
  })
  payment_method!: PaymentMethod;

  @Column({ name: "doc_number", type: "varchar", nullable: false })
  doc_number!: string;

  @Column({
    name: "sub_total",
    type: "numeric",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  sub_total!: number;

  @Column({
    name: "taxes_amount",
    type: "numeric",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  taxes_amount!: number;

  @Column({
    name: "status",
    type: "enum",
    enum: TransactionStatus,
    nullable: false,
  })
  status!: TransactionStatus;

  @Column({ name: "observations", type: "text", nullable: false })
  observations!: string;

  @Column({
    name: "total",
    type: "numeric",
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
  provider?: Provider;

  @OneToMany(() => PurchaseItem, (purchaseItem) => purchaseItem.purchase, {
    cascade: true,
  })
  purchase_items!: PurchaseItem[];
}
