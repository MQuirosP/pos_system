import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    userId!: number;

    @Column({ type: "varchar", unique: true})
    username!: string;

    @Column({ type: "varchar", nullable: true, unique: true })
    email!: string;

    @Column({ type: "varchar", nullable: true })
    password!: string;

    @Column({ type: "enum", enum: ['administrator', 'user'], default: 'user' })
    role!: 'administrator' | 'user';

    @Column({ type: "enum", enum: [ 'active', 'suspended', 'pending'], default: 'pending' })
    status!: 'active' | 'suspended' | 'pending';

    @Column({ type: "varchar", nullable: true })
    name!: string;

    @Column({ type: "varchar", nullable: true })
    lastname!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt!: Date;

}