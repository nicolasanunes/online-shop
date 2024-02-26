import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
//import { loginUserMock } from '../__mock__/login-user.mock';
//import { listLoginMock } from '../__mock__/list-login.mock';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            //login: jest.fn().mockResolvedValue(listLoginMock),
          },
        },
      ],
      controllers: [AuthController],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  //  it('should return login', async () => {
  //    const login = await authController.login(loginUserMock);
  //
  //    expect(login).toEqual(listLoginMock);
  //  });
});
