import { Test, TestingModule } from '@nestjs/testing';
import { CorreiosController } from '../correios.controller';
import { CorreiosService } from '../correios.service';

describe('CorreiosController', () => {
  let correiosController: CorreiosController;
  let correiosService: CorreiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CorreiosService,
          useValue: {
            findAddressByCep: jest.fn().mockResolvedValue({}),
          },
        },
      ],
      controllers: [CorreiosController],
    }).compile();

    correiosController = module.get<CorreiosController>(CorreiosController);
    correiosService = module.get<CorreiosService>(CorreiosService);
  });

  it('should be defined', () => {
    expect(correiosController).toBeDefined();
    expect(correiosService).toBeDefined();
  });
});
