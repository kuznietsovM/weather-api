import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';

export interface ConfigType {
  db: TypeOrmModuleOptions;
}

export const appConfigSchema = Joi.object({
  DB_HOST: Joi.string().default('postgres'),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SYNC: Joi.boolean().required().default(false),
});
