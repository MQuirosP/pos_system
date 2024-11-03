import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Product } from "./products.entity";
import { BaseFormattedEntity } from "./BaseFormatedEntity";

@Entity("categories")
export class Categories extends BaseFormattedEntity {
    protected fieldsToLowerCase(): string[] {
      return ["category_name"];
    }
    protected fieldsToCapitalize(): string[] {
      return ["category_name"]
    }

    @PrimaryGeneratedColumn("increment")
    category_id!: number;

    @Column({ type: "varchar", nullable: false})
    category_name?: string;

    @CreateDateColumn()
    created_at!: Date;

    @OneToMany(() => Product, product => product.category)
    products!: Product[];
}