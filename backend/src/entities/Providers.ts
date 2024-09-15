import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Purchase } from "./Purchases";

@Entity("providers")
export class Provider {
  @PrimaryGeneratedColumn({ name: "provider_id" })
  providerId!: number;

  @Column({
    name: "provider_name",
    type: "varchar",
    length: 50,
    nullable: false,
  })
  providerName!: string;

  @Column({
    name: "provider_address",
    type: "varchar",
    length: 100,
    nullable: false,
  })
  providerAddress!: string;

  @Column({
    name: "provider_phone",
    type: "varchar",
    length: 20,
    nullable: false,
  })
  providerPhone!: string;

  @Column({
    name: "provider_email",
    type: "varchar",
    length: 50,
    nullable: false,
  })
  providerEmail!: string;

  @Column({
    name: "provider_dni",
    type: "varchar",
    length: 20,
    nullable: false,
    unique: true,
  })
  providerDni!: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  @OneToMany(() => Purchase, purchase => purchase.provider)
      purchases!: Purchase[];
}
