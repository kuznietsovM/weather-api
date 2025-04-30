import { Body, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { WeatherParamsDto } from './weather-params.dto';
import { WeatherService } from './weather.service';
import { WeatherInterceptor } from './weather.interceptor';

@Controller('weather')
export class WeatherController {

  constructor(private readonly weatherService: WeatherService){}

  @Post()
  async create(
    @Body() body: WeatherParamsDto 
  ) {
    return await this.weatherService.create(body)
  }

  @Get()
  @UseInterceptors(WeatherInterceptor)
  async find (
    @Query() query: WeatherParamsDto
  ) {
    return await this.weatherService.find(query)
  }
}
