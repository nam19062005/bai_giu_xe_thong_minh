import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { VehicleEntry } from './vehicle_entry.entity';
import { Transaction } from './transaction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  phone?: string;

  @Column({ type: 'text', default: 'student' })
  role: string;

  @Column({ type: 'text', nullable: true })
  student_id?: string;

  @Column({ type: 'numeric', default: 0 })
  balance: number;

  @Column({ type: 'text', select: false, nullable: true })
  password?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => VehicleEntry, entry => entry.user)
  vehicle_entries: VehicleEntry[];

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];
}
