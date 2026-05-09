import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ParkingSpotsModule } from './parking-spots/parking-spots.module';
import { VehicleEntriesModule } from './vehicle-entries/vehicle-entries.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SensorsModule } from './sensors/sensors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Biến môi trường khả dụng trên toàn cục
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'secret'),
        database: configService.get<string>('DB_DATABASE', 'hcmut_parking'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Cảnh báo: Chỉ dùng cho dev, không dùng ở production!
      }),
    }),
    UsersModule,
    ParkingSpotsModule,
    VehicleEntriesModule,
    TransactionsModule,
    SensorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

