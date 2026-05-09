import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, OneToOne } from 'typeorm';
import { Sensor } from './sensor.entity';

@Entity('parking_spots')
export class ParkingSpot {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: string;

  @Column({ type: 'text' })
  zone: string; // A, B, C, D

  @Column({ type: 'int' })
  spot_number: number;

  @Column({ type: 'boolean', default: false })
  is_occupied: boolean;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToOne(() => Sensor, sensor => sensor.parking_spot)
  sensor: Sensor;
}
