import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userMock } from '../__mock__/user.mock';
import { createUserMock } from '../__mock__/create-user.mock';
import {
  updateInvalidUserPasswordMock,
  updateUserPasswordMock,
} from '../__mock__/update-user-password.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userMock),
            save: jest.fn().mockResolvedValue(userMock),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in listUserByEmail', async () => {
    const user = await userService.listUserByEmail(userMock.email);

    expect(user).toEqual(userMock);
  });

  it('should return error in listUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(userService.listUserByEmail(userMock.email)).rejects.toThrowError();
  });

  it('should return error in listUserByEmail (error db)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(userService.listUserByEmail(userMock.email)).rejects.toThrowError();
  });

  it('should return user in findUserById', async () => {
    const user = await userService.findUserById(userMock.id);

    expect(user).toEqual(userMock);
  });

  it('should return error in findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(userService.findUserById(userMock.id)).rejects.toThrowError();
  });

  it('should return error in findUserById (error db)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(userService.findUserById(userMock.id)).rejects.toThrowError();
  });

  it('should return user in listUserByIdUsingRelations', async () => {
    const user = await userService.listUserByIdUsingRelations(userMock.id);

    expect(user).toEqual(userMock);
  });

  it('should return error if user do not exist', async () => {
    expect(userService.createUser(createUserMock)).rejects.toThrowError();
  });

  it('should return user if user exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(undefined);

    const user = await userService.createUser(createUserMock);

    expect(user).toEqual(userMock);
  });

  it('should return user in updateUserPassword', async () => {
    const user = await userService.updateUserPassword(
      updateUserPasswordMock,
      userMock.id,
    );

    expect(user).toEqual(userMock);
  });

  it('should return invalid password if last password is invalid', async () => {
    expect(
      userService.updateUserPassword(
        updateInvalidUserPasswordMock,
        userMock.id,
      ),
    ).rejects.toThrowError();
  });

  it('should return error if user do not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      userService.updateUserPassword(updateUserPasswordMock, userMock.id),
    ).rejects.toThrowError();
  });
});
