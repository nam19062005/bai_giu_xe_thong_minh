import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from '../entities/sensor.entity';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor)
    private sensorsRepository: Repository<Sensor>,
  ) {}

  async create(createData: Partial<Sensor>): Promise<Sensor> {
    const sensor = this.sensorsRepository.create(createData);
    return await this.sensorsRepository.save(sensor);
  }

  async findAll(): Promise<Sensor[]> {
    return await this.sensorsRepository.find({ relations: ['parking_spot'] });
  }

  async findOne(id: string): Promise<Sensor> {
    const sensor = await this.sensorsRepository.findOne({ 
      where: { id },
      relations: ['parking_spot']
    });
    if (!sensor) {
      throw new NotFoundException(`Sensor with ID ${id} not found`);
    }
    return sensor;
  }

  async update(id: string, updateData: Partial<Sensor>): Promise<Sensor> {
    const sensor = await this.findOne(id);
    Object.assign(sensor, updateData);
    return await this.sensorsRepository.save(sensor);
  }

  async remove(id: string): Promise<void> {
    const sensor = await this.findOne(id);
    await this.sensorsRepository.remove(sensor);
  }
}
