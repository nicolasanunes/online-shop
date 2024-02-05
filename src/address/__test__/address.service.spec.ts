import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressService } from '../address.service';
import { AddressEntity } from '../entities/address.entity';
import { addressMock } from '../__mock__/address.mock';
import { UserService } from '../../user/user.service';
import { cityMock } from '../../city/__mock__/city.mock';
import { userMock } from '../../user/__mock__/user.mock';
import { CityService } from '../../city/city.service';
import { createAddressMock } from '../__mock__/create-address.mock';

describe('AddressService', () => {
  let addressService: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue(userMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            listCityById: jest.fn().mockResolvedValue(cityMock),
          },
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
            find: jest.fn().mockResolvedValue([addressMock]),
          },
        },
      ],
    }).compile();

    cityService = module.get<CityService>(CityService);
    userService = module.get<UserService>(UserService);
    addressService = module.get<AddressService>(AddressService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(addressService).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should return address after save', async () => {
    const address = await addressService.createAddress(
      createAddressMock,
      userMock.id,
    );

    expect(address).toEqual(addressMock);
  });

  it('should return error if exception in userService', async () => {
    jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());

    expect(
      addressService.createAddress(createAddressMock, userMock.id),
    ).rejects.toThrowError();
  });

  it('should return error if exception in cityService', async () => {
    jest.spyOn(cityService, 'listCityById').mockRejectedValueOnce(new Error());

    expect(
      addressService.createAddress(createAddressMock, userMock.id),
    ).rejects.toThrowError();
  });

  it('should return all address to user', async () => {
    const addresses = await addressService.listAddressByUserId(userMock.id);

    expect(addresses).toEqual([addressMock]);
  });

  it('should return not found if address not find', async () => {
    jest.spyOn(addressRepository, 'find').mockResolvedValue(undefined);

    expect(
      addressService.listAddressByUserId(userMock.id),
    ).rejects.toThrowError();
  });
});
