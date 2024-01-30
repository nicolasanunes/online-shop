import { cityMock } from '../../city/__mock__/city.mock';
import { AddressEntity } from '../entities/address.entity';
import { userMock } from '../../user/__mock__/user.mock';

export const addressMock: AddressEntity = {
  id: 4241,
  cep: '456456',
  cityId: cityMock.id,
  complement: 'complement',
  numberAddress: 1231,
  userId: userMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
