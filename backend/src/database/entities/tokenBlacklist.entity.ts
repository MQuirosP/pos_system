import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("token_blacklist")
export class TokenBlacklist {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({ type: "varchar", nullable: false})
    token!: string;

    @CreateDateColumn()
    blacklisted_at!: Date;
}