import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, OneToOne, JoinColumn, Index } from 'typeorm';
import { ParkingSpot } from './parking_spot.entity';

@Entity('sensors')
export class Sensor {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: string;

  @Index()
  @Column({ type: 'bigint', unique: true })
  spot_id: string;

  @OneToOne(() => ParkingSpot, spot => spot.sensor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'spot_id' })
  parking_spot: ParkingSpot;

  @Column({ type: 'int', default: 100 })
  battery_level: number;

  @Column({ type: 'text', default: 'online' })
  status: string; // online, offline, maintenance

  @UpdateDateColumn({ type: 'timestamptz' })
  last_ping: Date;
}
