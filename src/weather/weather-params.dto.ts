import { IsArray, IsEnum, IsLatitude, IsLongitude, IsOptional } from "class-validator"
import { ExcludedFields } from "../open-weather-map/open-weather-map.service"

export class WeatherParamsDto {
  @IsLatitude()
  lat: number

  @IsLongitude()
  lon: number

  @IsOptional()
  @IsArray()
  @IsEnum(ExcludedFields, {each: true})
  part?: ExcludedFields[]
}