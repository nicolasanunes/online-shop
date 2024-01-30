import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mock__/user.mock';
import { createUserMock } from '../__mock__/create-user.mock';

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
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
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
    const user = await userService.listUserByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in listUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      userService.listUserByEmail(userEntityMock.email),
    ).rejects.toThrowError();
  });

  it('should return error in listUserByEmail (error db)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(
      userService.listUserByEmail(userEntityMock.email),
    ).rejects.toThrowError();
  });

  it('should return user in listUserById', async () => {
    const user = await userService.listUserById(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in listUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(userService.listUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return error in listUserById (error db)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(userService.listUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return user in listUserByIdUsingRelations', async () => {
    const user = await userService.listUserByIdUsingRelations(
      userEntityMock.id,
    );

    expect(user).toEqual(userEntityMock);
  });

  it('should return error if user do not exist', async () => {
    expect(userService.createUser(createUserMock)).rejects.toThrowError();
  });

  it('should return user if user exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(undefined);

    const user = await userService.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
  });
});