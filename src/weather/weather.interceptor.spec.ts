import { CallHandler, ExecutionContext } from '@nestjs/common';
import { CurrentWeatherResponse } from './current-weather-response.dto';
import { WeatherInterceptor } from './weather.interceptor';
import { firstValueFrom, of } from 'rxjs';

describe('WeatherInterceptor', () => {
  let interceptor: WeatherInterceptor;

  beforeEach(() => {
    interceptor = new WeatherInterceptor()
  })

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should return only exposed fields', async () => {
    const expected : CurrentWeatherResponse = {
      sunrise :1684926645,
      sunset:1684977332,
      temp:292.55,
      feels_like:292.87,
      pressure:1014,
      humidity:89,
      uvi:0.16,
      wind_speed:3.13
    }
    const mockData = {
      data: {
        lat: 14,
        lon: -33,
        timezone: "Etc/GMT+2",
        timezone_offset: -7200,
        current: {
          ...expected,
          dt: 1746006777,
          weather: [{
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d"
          }]
        }
      }
    }
    const context = {} as ExecutionContext
    const next: CallHandler = {
      handle: () => of(mockData)
    }

    const result = await firstValueFrom(interceptor.intercept(context, next));
    
    expect(result).toEqual(expected);
    expect(result.lat).toBeUndefined();
    expect(result.lon).toBeUndefined();
    expect(result.timezone).toBeUndefined();
  })
});
