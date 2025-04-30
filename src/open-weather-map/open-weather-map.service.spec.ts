import { Test, TestingModule } from '@nestjs/testing';
import { OpenWeatherMapService } from './open-weather-map.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { OpenWeatherMapConfig } from 'src/config/open-weather-map.config';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('OpenWeatherMapService', () => {
  let service: OpenWeatherMapService;
  let httpService: DeepMocked<HttpService>
  let origin: string

  beforeEach(async () => {
    const apiKey = "mockKey"
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenWeatherMapService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() : OpenWeatherMapConfig => ({apiKey}))
          }
        }
      ],
    })
      .useMocker(createMock)
      .compile();

    origin = `https://api.openweathermap.org/data/3.0/onecall?appid=${apiKey}`
    service = module.get<OpenWeatherMapService>(OpenWeatherMapService);
    httpService = module.get(HttpService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send successfull request to OpenWeatherMap api and return response data', async () => {
    const lat = 14
    const lon = -33
    const expected = {
      lat,
      lon,
      timezone: "Etc/GMT+2",
      timezone_offset: -7200,
    }
    const apiResponse: AxiosResponse = {
      data: {...expected},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any
    } 
    httpService.get.mockReturnValue(of(apiResponse))

    const result = await service.getWeatherData(lat, lon)
    
    expect(result).toEqual(expected)
    expect(httpService.get).toHaveBeenCalledWith(origin, {params: {lat, lon}})
  })

  describe('handle error', () => {
    it('should handle 401 Axios error', () => {
      const error = {
        isAxiosError: true,
        status: 401,
      }
      httpService.get.mockImplementation(() => {
        throw error
      })

      const result = service.getWeatherData(1, 2)

      expect(result).rejects.toThrow(UnauthorizedException)
    })

    it('should handle 404 Axios error', () => {
      const error = {
        isAxiosError: true,
        status: 404,
      }
      httpService.get.mockImplementation(() => {
        throw error
      })

      const result = service.getWeatherData(1, 2)
      
      expect(result).rejects.toThrow(NotFoundException)
    })
  })
});
