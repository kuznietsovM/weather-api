import { Module } from '@nestjs/common';
import { OpenWeatherMapService } from './open-weather-map.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  exports: [OpenWeatherMapService],
  providers: [OpenWeatherMapService]
})
export class OpenWeatherMapModule {}
