import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CurrentWeatherResponse } from './current-weather-response.dto';
import { plainToInstance } from 'class-transformer';

/**
 * As I understood from the task, I should send response in the following format:
 * {
 *  "sunrise":1684926645,
 *  "sunset":1684977332,
 *  "temp":292.55,
 *  "feels_like":292.87,
 *  "pressure":1014,
 *  "humidity":89,
 *  "uvi":0.16,
 *  "wind_speed":3.13
 * }
 * I assumed that I should get them from "current" field
 */

@Injectable()
export class CurrentWeatherInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) =>
        plainToInstance(CurrentWeatherResponse, data.data.current, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
