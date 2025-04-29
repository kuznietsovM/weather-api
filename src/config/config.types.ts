import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { OpenWeatherMapConfig } from './open-weather-map.config';

export interface ConfigType {
  db: TypeOrmModuleOptions;
  openWeatherMap: OpenWeatherMapConfig;
}

export const appConfigSchema = Joi.object({
  DB_HOST: Joi.string().default('postgres'),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SYNC: Joi.boolean().required().default(false),
  OPEN_WEATHER_MAP_API_KEY: Joi.string().required()
});
