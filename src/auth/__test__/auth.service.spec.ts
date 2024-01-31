import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { userMock } from '../../user/__mock__/user.mock';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { jwtMock } from '../__mock__/jwt.mock';
import { loginUserMock } from '../__mock__/login-user.mock';
import { ListUserDto } from '../../user/dto/list-user.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            listUserByEmail: jest.fn().mockResolvedValue(userMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user with password and email valid', async () => {
    const user = await authService.login(loginUserMock);

    expect(user).toEqual({
      accessToken: jwtMock,
      user: new ListUserDto(userMock),
    });
  });

  it('should return user if password invalid and email valid', async () => {
    expect(
      authService.login({ ...loginUserMock, password: '4321' }),
    ).rejects.toThrowError();
  });

  it('should return user if email not exists', async () => {
    jest.spyOn(userService, 'listUserByEmail').mockResolvedValue(undefined);

    expect(authService.login(loginUserMock)).rejects.toThrowError();
  });

  it('should return error in UserService', async () => {
    jest.spyOn(userService, 'listUserByEmail').mockRejectedValue(new Error());

    expect(authService.login(loginUserMock)).rejects.toThrowError();
  });
});
