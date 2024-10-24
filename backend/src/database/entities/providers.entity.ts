import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Purchase } from "@entities/purchases.entity";
import { IProviders } from "@interfaces/providers.interface";
import { BaseFormattedEntity } from "@entities/BaseFormatedEntity";

@Entity("providers")
export class Provider extends BaseFormattedEntity implements IProviders {
  @PrimaryGeneratedColumn({ name: "provider_id" })
  provider_id!: number;

  @Column({
    name: "provider_name",
    type: "varchar",
    length: 50,
    nullable: false,
  })
  provider_name!: string;

  @Column({
    name: "provider_address",
    type: "varchar",
    length: 100,
    nullable: false,
  })
  provider_address!: string;

  @Column({
    name: "provider_phone",
    type: "varchar",
    length: 20,
    nullable: false,
  })
  provider_phone!: string;

  @Column({
    name: "provider_email",
    type: "varchar",
    length: 50,
    nullable: false,
  })
  provider_email!: string;

  @Column({
    name: "provider_dni",
    type: "varchar",
    length: 20,
    nullable: false,
    unique: true,
  })
  provider_dni!: string;

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

  @OneToMany(() => Purchase, purchase => purchase.provider)
      purchases!: Purchase[];

  protected fieldsToLowerCase(): string[] {
      return ["provider_name", "provider_address", "provider_email"]
  }

  protected fieldsToCapitalize(): string[] {
      return ["provider_name"]
  }
}
