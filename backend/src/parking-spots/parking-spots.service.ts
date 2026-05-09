import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingSpot } from '../entities/parking_spot.entity';

@Injectable()
export class ParkingSpotsService {
  constructor(
    @InjectRepository(ParkingSpot)
    private parkingSpotsRepository: Repository<ParkingSpot>,
  ) {}

  async create(createData: Partial<ParkingSpot>): Promise<ParkingSpot> {
    const spot = this.parkingSpotsRepository.create(createData);
    return await this.parkingSpotsRepository.save(spot);
  }

  async findAll(): Promise<ParkingSpot[]> {
    return await this.parkingSpotsRepository.find({ relations: ['sensor'] });
  }

  async findOne(id: string): Promise<ParkingSpot> {
    const spot = await this.parkingSpotsRepository.findOne({ 
      where: { id },
      relations: ['sensor']
    });
    if (!spot) {
      throw new NotFoundException(`Parking Spot with ID ${id} not found`);
    }
    return spot;
  }

  async update(id: string, updateData: Partial<ParkingSpot>): Promise<ParkingSpot> {
    const spot = await this.findOne(id);
    Object.assign(spot, updateData);
    return await this.parkingSpotsRepository.save(spot);
  }

  async remove(id: string): Promise<void> {
    const spot = await this.findOne(id);
    await this.parkingSpotsRepository.remove(spot);
  }
}
