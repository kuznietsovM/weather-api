import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { ExcludedFields, OpenWeatherMapService } from '../open-weather-map/open-weather-map.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Weather } from './weather.entity';
import { Repository } from 'typeorm';
import { WeatherParamsDto } from './weather-params.dto';
import { NotFoundException } from '@nestjs/common';

describe('WeatherService', () => {
  let service: WeatherService;
  let openWeatherMapService: DeepMocked<OpenWeatherMapService>;
  let weatherRepository: DeepMocked<Repository<Weather>>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: getRepositoryToken(Weather),
          useValue: {
            save: jest.fn(),
            query: jest.fn()
          }
        }
      ],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<WeatherService>(WeatherService);
    openWeatherMapService = module.get(OpenWeatherMapService) 
    weatherRepository = module.get(getRepositoryToken(Weather))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new weather', async () => {
    const mockParams: WeatherParamsDto = {
      lat: 46,
      lon: 30,
      part: [ExcludedFields.Alerts]
    } 
    const apiResponse = {
      lat: 30,
      lon: 30,
      timezone: "Europe/Kyiv",
      timezone_offset: 10800,
    }
    const expected : Weather = {
      id: 1,
      data: apiResponse
    }
    openWeatherMapService.getWeatherData.mockResolvedValue(apiResponse)
    weatherRepository.save.mockResolvedValue({id: 1, data: apiResponse})

    const result = await service.create(mockParams)

    expect(result).toEqual(expected)
    expect(openWeatherMapService.getWeatherData).toHaveBeenCalledWith(mockParams.lat, mockParams.lon, mockParams.part)
    expect(weatherRepository.save).toHaveBeenCalledWith({data: apiResponse})
  })

  it('should successfuly find weather data', async () => {
    const mockParams: WeatherParamsDto = {
      lat: 46,
      lon: 30,
    }
    const expected = {
      data: {
        ...mockParams,
        timezone: "Europe/Kyiv",
        timezone_offset: 10800,
      }
    }
    weatherRepository.query.mockResolvedValue([expected])

    const result = await service.find(mockParams)
    
    expect(result).toEqual(expected)
  })

  it('should throw NotFoundException on not found weather data', async () => {
    const mockParams: WeatherParamsDto = {
      lat: 46,
      lon: 30,
    }
    weatherRepository.query.mockResolvedValue([])

    const result = service.find(mockParams)

    await expect(result).rejects.toThrow(NotFoundException)
  })
});
