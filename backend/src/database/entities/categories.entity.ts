import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Product } from "./products.entity";

@Entity("categories")
export class Categories {

    @PrimaryGeneratedColumn("increment")
    category_id!: number;

    @Column({ type: "varchar", nullable: false})
    category_name!: string;

    @CreateDateColumn()
    created_at!: Date;

    @OneToMany(() => Product, product => product.category)
    products!: Product[];
}