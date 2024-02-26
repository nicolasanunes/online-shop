import { Test, TestingModule } from '@nestjs/testing';
import { StateController } from '../state.controller';
import { StateService } from '../state.service';
import { stateMock } from '../__mock__/state.mock';

describe('StateController', () => {
  let stateController: StateController;
  let stateService: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StateService,
          useValue: {
            listAllStates: jest.fn().mockResolvedValue([stateMock]),
          },
        },
      ],
      controllers: [StateController],
    }).compile();

    stateController = module.get<StateController>(StateController);
    stateService = module.get<StateService>(StateService);
  });

  it('should be defined', () => {
    expect(stateController).toBeDefined();
    expect(stateService).toBeDefined();
  });

  it('should return StateEntity in listAllStates', async () => {
    const states = await stateController.listAllStates();

    expect(states).toEqual([stateMock]);
  });
});
