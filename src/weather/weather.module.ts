import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { OpenWeatherMapModule } from '../open-weather-map/open-weather-map.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from './weather.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Weather]),
    OpenWeatherMapModule
  ],
  providers: [WeatherService],
  controllers: [WeatherController]
})
export class WeatherModule {}
