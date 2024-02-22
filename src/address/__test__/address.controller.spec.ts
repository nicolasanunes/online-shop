import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from '../address.controller';
import { AddressService } from '../address.service';
import { createAddressMock } from '../__mock__/create-address.mock';
import { userMock } from '../../user/__mock__/user.mock';
import { addressMock } from '../__mock__/address.mock';

describe('AddressController', () => {
  let addressController: AddressController;
  let addressService: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AddressService,
          useValue: {
            createAddress: jest.fn().mockResolvedValue(addressMock),
            listAddressByUserId: jest.fn().mockResolvedValue([addressMock]),
          },
        },
      ],
      controllers: [AddressController],
    }).compile();

    addressController = module.get<AddressController>(AddressController);
    addressService = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(addressController).toBeDefined();
    expect(addressService).toBeDefined();
  });

  it('should return AddressEntity in createAddress', async () => {
    const address = await addressController.createAddress(
      userMock.id,
      createAddressMock,
    );

    expect(address).toEqual(addressMock);
  });

  it('should return AddressEntity in listAddressByUserId', async () => {
    const addresses = await addressController.listAddressByUserId(userMock.id);

    expect(addresses).toEqual([
      {
        complement: addressMock.complement,
        numberAddress: addressMock.numberAddress,
        cep: addressMock.cep,
      },
    ]);
  });
});
