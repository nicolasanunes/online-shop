import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { userMock } from '../__mock__/user.mock';
import { createUserMock } from '../__mock__/create-user.mock';
import { updateUserPasswordMock } from '../__mock__/update-user-password.mock';
import { ListUserDto } from '../dto/list-user.dto';
import { UserTypeEnum } from '../enum/user-type.enum';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(userMock),
            listAllUsers: jest.fn().mockResolvedValue([userMock]),
            listUserByIdUsingRelations: jest.fn().mockResolvedValue(userMock),
            updateUserPassword: jest.fn().mockResolvedValue(userMock),
          },
        },
      ],
      controllers: [UserController],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return UserEntity in createUser', async () => {
    const user = await userController.createUser(createUserMock);

    expect(user).toEqual(userMock);
  });

  it('should return UserEntity in createUser (Admin)', async () => {
    const spy = jest.spyOn(userService, 'createUser');
    const user = await userController.createAdmin(createUserMock);

    expect(user).toEqual(userMock);
    expect(spy.mock.calls[0][1]).toEqual(UserTypeEnum.Admin);
  });

  it('should return all users in listAllUsers', async () => {
    const users = await userController.listAllUsers();

    expect(users).toEqual([
      {
        id: userMock.id,
        cpf: userMock.cpf,
        email: userMock.email,
        name: userMock.name,
        phone: userMock.phone,
      },
    ]);
  });

  it('should return user in listUserById', async () => {
    const user = await userController.listUserById(userMock.id);

    expect(user).toEqual({
      cpf: userMock.cpf,
      email: userMock.email,
      id: userMock.id,
      name: userMock.name,
      phone: userMock.phone,
    });
  });

  it('should return UserEntity in updateUserPassword', async () => {
    const user = await userController.updateUserPassword(
      updateUserPasswordMock,
      userMock.id,
    );

    expect(user).toEqual(userMock);
  });

  it('should return UserEntity in getInfoUser', async () => {
    const user = await userController.getInfoUser(userMock.id);

    expect(user).toEqual(new ListUserDto(userMock));
  });
});
