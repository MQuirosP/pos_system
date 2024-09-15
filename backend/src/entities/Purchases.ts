import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Product } from "./Products";
import { Provider } from "./Providers";
// import { Provider } from "./Provider"; // Asegúrate de tener la entidad Provider en tu proyecto

@Entity("purchases")
export class Purchase {
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

    @ManyToOne(() => Provider, (provider) => provider.purchases, { onDelete: 'SET NULL' })
    @JoinColumn({ name: "provider_id" })
    provider!: Provider;

  @ManyToMany(() => Product, (product) => product.purchases)
  @JoinTable({
    name: "purchase_items",
    joinColumn: { name: "purchase_id", referencedColumnName: "purchase_id" },
    inverseJoinColumn: {
      name: "product_id",
      referencedColumnName: "product_id",
    },
  })
  products!: Product[];
}
