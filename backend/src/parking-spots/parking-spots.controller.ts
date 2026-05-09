import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingSpotsService } from './parking-spots.service';
import { ParkingSpot } from '../entities/parking_spot.entity';

@Controller('parking-spots')
export class ParkingSpotsController {
  constructor(private readonly parkingSpotsService: ParkingSpotsService) {}

  @Post()
  create(@Body() createDto: Partial<ParkingSpot>) {
    return this.parkingSpotsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.parkingSpotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingSpotsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: Partial<ParkingSpot>) {
    return this.parkingSpotsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingSpotsService.remove(id);
  }
}
