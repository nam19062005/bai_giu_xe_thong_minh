import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleEntriesService } from './vehicle-entries.service';
import { VehicleEntry } from '../entities/vehicle_entry.entity';

@Controller('vehicle-entries')
export class VehicleEntriesController {
  constructor(private readonly vehicleEntriesService: VehicleEntriesService) {}

  @Post()
  create(@Body() createDto: Partial<VehicleEntry>) {
    return this.vehicleEntriesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.vehicleEntriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleEntriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: Partial<VehicleEntry>) {
    return this.vehicleEntriesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleEntriesService.remove(id);
  }
}
