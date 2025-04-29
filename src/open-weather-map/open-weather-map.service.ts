import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isAxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ConfigType } from 'src/config/config.types';
import { OpenWeatherMapConfig } from 'src/config/open-weather-map.config';

export enum ExcludedFields {
  Current = "current",
  Minutely = "minutely",
  Hourly = "hourly",
  Daily = "daily",
  Alerts = "alerts"
}

@Injectable()
export class OpenWeatherMapService {
  private origin: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService<ConfigType>
  ) {
    const apiToken = configService.get<OpenWeatherMapConfig>('openWeatherMap').apiKey
    this.origin = `https://api.openweathermap.org/data/3.0/onecall?appid=${apiToken}`
  }

  private handleError(e: any) {
    if(!isAxiosError(e))
      throw e
  
    switch(e.status) {
      case 401:
        throw new UnauthorizedException(e)
      case 404:
          throw new NotFoundException(e)
      default:
          throw new InternalServerErrorException(e)
    } 
  }

  async getWeatherData (lat: number, lon: number, part?: ExcludedFields[]) {
    try{
      const request = this.httpService.get(this.origin, {
        params: {
          lat,
          lon,
          exclude: part ? part.toString() : undefined
        }
      })

      const { data } = await firstValueFrom(request)
      return data
    } catch (e) {
      this.handleError(e)
    }
  }
}
