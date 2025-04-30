import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { WeatherService } from './weather.service';
import { WeatherParamsDto } from './weather-params.dto';

describe('WeatherController', () => {
  let controller: WeatherController;
  let weatherService: DeepMocked<WeatherService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<WeatherController>(WeatherController);
    weatherService = module.get(WeatherService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call weatherService create() and return result', async () => {
    const mockParams : WeatherParamsDto = {
      lat: 46,
      lon: 30
    }
    const expected = {
      id: 1,
      data: {
        ...mockParams
      }
    }
    weatherService.create.mockResolvedValue(expected)

    const result = await controller.create(mockParams)

    expect(result).toEqual(expected)
    expect(weatherService.create).toHaveBeenCalledWith(mockParams)
  })

  it('should call weatherService find() and return result', async () => {
    const mockParams : WeatherParamsDto = {
      lat: 46,
      lon: 30
    }
    const expected = {
      data: {
        ...mockParams
      }
    }
    weatherService.find.mockResolvedValue(expected)

    const result = await controller.find(mockParams)

    expect(result).toEqual(expected)
    expect(weatherService.find).toHaveBeenCalledWith(mockParams)
  })
});
