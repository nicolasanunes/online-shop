import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from '../city.controller';
import { CityService } from '../city.service';
import { cityMock } from '../__mock__/city.mock';
import { stateMock } from '../../state/__mock__/state.mock';

describe('CityController', () => {
  let cityController: CityController;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CityService,
          useValue: {
            listAllCitiesByStateId: jest.fn().mockResolvedValue([cityMock]),
          },
        },
      ],
      controllers: [CityController],
    }).compile();

    cityController = module.get<CityController>(CityController);
    cityService = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(cityController).toBeDefined();
    expect(cityService).toBeDefined();
  });

  it('should return cityEntity in insertProductInCity', async () => {
    const city = await cityController.listAllCitiesByStateId(stateMock.id);

    expect(city).toEqual([cityMock]);
  });
});
