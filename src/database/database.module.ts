import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypedConfigService } from '../config/typed-config.service';
import { Weather } from '../weather/weather.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TypedConfigService) => ({
        ...configService.get('db'),
        entities: [Weather]
      }),
    }),
  ],
})
export class DatabaseModule {}
