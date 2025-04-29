import { registerAs } from "@nestjs/config"

export interface OpenWeatherMapConfig {
  apiKey: string
}

export const openWeatherMapConfig = registerAs('openWeatherMap', () : OpenWeatherMapConfig => ({
  apiKey: process.env.OPEN_WEATHER_MAP_API_KEY
}))