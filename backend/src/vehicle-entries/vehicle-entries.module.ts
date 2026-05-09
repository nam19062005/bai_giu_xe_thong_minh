import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntriesService } from './vehicle-entries.service';
import { VehicleEntriesController } from './vehicle-entries.controller';
import { VehicleEntry } from '../entities/vehicle_entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntry])],
  controllers: [VehicleEntriesController],
  providers: [VehicleEntriesService],
  exports: [VehicleEntriesService],
})
export class VehicleEntriesModule {}
