import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';

@Entity('vehicle_entries')
export class VehicleEntry {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: string;

  @Index()
  @Column({ type: 'bigint' })
  user_id: string;

  @ManyToOne(() => User, user => user.vehicle_entries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text' })
  license_plate: string;

  @CreateDateColumn({ type: 'timestamptz' })
  entry_time: Date;

  @Column({ type: 'timestamptz', nullable: true })
  exit_time: Date;

  @Column({ type: 'text', default: 'inside' })
  status: string; // inside, exited
}
