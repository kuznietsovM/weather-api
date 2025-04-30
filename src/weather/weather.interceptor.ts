import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CurrentWeatherResponse } from './current-weather-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WeatherInterceptor implements NestInterceptor {
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
