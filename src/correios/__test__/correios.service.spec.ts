import { Test, TestingModule } from '@nestjs/testing';
import { CorreiosService } from '../correios.service';
import { CityService } from '../../city/city.service';
import { HttpService } from '@nestjs/axios';

describe('CorreiosService', () => {
  let correiosService: CorreiosService;
  let cityService: CityService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CityService,
          useValue: {},
        },
        {
          provide: HttpService,
          useValue: {},
        },
        CorreiosService,
      ],
    }).compile();

    correiosService = module.get<CorreiosService>(CorreiosService);
    cityService = module.get<CityService>(CityService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(correiosService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(httpService).toBeDefined();
  });
});
