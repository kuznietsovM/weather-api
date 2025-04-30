import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/db.config';
import { appConfigSchema } from './config/config.types';
import { OpenWeatherMapModule } from './open-weather-map/open-weather-map.module';
import { openWeatherMapConfig } from './config/open-weather-map.config';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [typeOrmConfig, openWeatherMapConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        abortEarly: true
      }
    }),
    OpenWeatherMapModule,
    WeatherModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
