import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('increment', { name: 'userId' })
  userId!: number; // Usa el modificador `!` para indicar que la propiedad será inicializada

  @Column({ type: 'varchar', unique: true })
  username!: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string | null = null;

  @Column({ type: 'varchar', nullable: true })
  password: string | null = null;

  @Column({ type: 'enum', enum: ['administrator', 'user'], default: 'user' })
  role!: 'administrator' | 'user';

  @Column({ type: 'enum', enum: ['active', 'suspended', 'pending'], default: 'pending' })
  status!: 'active' | 'suspended' | 'pending';

  @Column({ type: 'varchar', nullable: true })
  name: string | null = null;

  @Column({ type: 'varchar', nullable: true })
  lastname: string | null = null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updatedAt' })
  updatedAt!: Date;
}
