import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntry } from '../entities/vehicle_entry.entity';

@Injectable()
export class VehicleEntriesService {
  constructor(
    @InjectRepository(VehicleEntry)
    private entriesRepository: Repository<VehicleEntry>,
  ) {}

  async create(createData: Partial<VehicleEntry>): Promise<VehicleEntry> {
    const entry = this.entriesRepository.create(createData);
    return await this.entriesRepository.save(entry);
  }

  async findAll(): Promise<VehicleEntry[]> {
    return await this.entriesRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<VehicleEntry> {
    const entry = await this.entriesRepository.findOne({ 
      where: { id },
      relations: ['user']
    });
    if (!entry) {
      throw new NotFoundException(`Vehicle Entry with ID ${id} not found`);
    }
    return entry;
  }

  async update(id: string, updateData: Partial<VehicleEntry>): Promise<VehicleEntry> {
    const entry = await this.findOne(id);
    Object.assign(entry, updateData);
    return await this.entriesRepository.save(entry);
  }

  async remove(id: string): Promise<void> {
    const entry = await this.findOne(id);
    await this.entriesRepository.remove(entry);
  }
}
