import { Injectable, NotFoundException, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    // Seed mock data for testing if table is empty
    const count = await this.usersRepository.count();
    if (count === 0) {
      console.log('Seeding mock users...');
      const mockUsers = [
        {
          name: 'Nguyễn Văn A',
          email: 'student@hcmut.edu.vn',
          role: 'student',
          student_id: '2052001',
          balance: 150000,
          password: 'student123',
        },
        {
          name: 'TS. Trần Thị B',
          email: 'lecturer@hcmut.edu.vn',
          role: 'lecturer',
          balance: 0,
          password: 'lecturer123',
        },
        {
          name: 'Lê Văn C',
          email: 'staff@hcmut.edu.vn',
          role: 'staff',
          password: 'staff123',
        },
        {
          name: 'Phạm Thị D',
          email: 'admin@hcmut.edu.vn',
          role: 'admin',
          password: 'admin123',
        },
      ];

      for (const userData of mockUsers) {
        // Not hashing here since mock login tests expect plain password logic right now, 
        // but in real app we should use bcrypt.hashSync(userData.password, 10);
        const user = this.usersRepository.create(userData);
        await this.usersRepository.save(user);
      }
      console.log('Mock users seeded!');
    }
  }

  async login(email: string, password?: string): Promise<User> {
    // For manual login, require password. For SSO, just email.
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'phone', 'role', 'student_id', 'balance', 'password', 'created_at', 'updated_at']
    });

    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại trong hệ thống');
    }

    if (password && user.password !== password) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    // Remove password before returning
    delete user.password;
    return user;
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateData);
    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
