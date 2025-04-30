import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenWeatherMapService } from '../open-weather-map/open-weather-map.service';
import { Weather } from './weather.entity';
import { Repository } from 'typeorm';
import { WeatherParamsDto } from './weather-params.dto';

@Injectable()
export class WeatherService {
  constructor(
    private readonly openWeatherMapService: OpenWeatherMapService,
    @InjectRepository(Weather) private readonly weatherRepository: Repository<Weather>
  ) {}

  async create(params: WeatherParamsDto) : Promise<Weather> {
    const weatherData = await this.openWeatherMapService.getWeatherData(params.lat, params.lon, params.part)

    return await this.weatherRepository.save({data: weatherData})
  }

  async find(params: WeatherParamsDto) {
    let excludedFieldsString = ''
    if(params.part && params.part.length > 0) {
      excludedFieldsString = params.part.reduce((prev, curr) => {
        return prev = prev + `- '${curr}' `
      }, excludedFieldsString)
    }
    
    const found: any[] = await this.weatherRepository
      .query(`
        SELECT data ${excludedFieldsString} AS data FROM weather 
        WHERE data->>'lat'='${params.lat}' AND data->>'lon'='${params.lon}' 
        LIMIT 1
      `)

    if(found.length === 0)
      throw new NotFoundException()

    return found[0]
  }
}
