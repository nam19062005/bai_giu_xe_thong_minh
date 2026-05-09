import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async create(createData: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.transactionsRepository.create(createData);
    return await this.transactionsRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionsRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({ 
      where: { id },
      relations: ['user']
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async update(id: string, updateData: Partial<Transaction>): Promise<Transaction> {
    const transaction = await this.findOne(id);
    Object.assign(transaction, updateData);
    return await this.transactionsRepository.save(transaction);
  }

  async remove(id: string): Promise<void> {
    const transaction = await this.findOne(id);
    await this.transactionsRepository.remove(transaction);
  }
}
