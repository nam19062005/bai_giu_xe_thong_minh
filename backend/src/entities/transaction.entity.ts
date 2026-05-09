import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: string;

  @Index()
  @Column({ type: 'bigint' })
  user_id: string;

  @ManyToOne(() => User, user => user.transactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  amount: string; // Sử dụng string cho kiểu numeric để tránh mất độ chính xác

  @Column({ type: 'text' })
  transaction_type: string; // deposit, payment

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
