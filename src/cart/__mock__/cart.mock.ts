import { userMock } from '../../user/__mock__/user.mock';
import { CartEntity } from '../entities/cart.entity';

export const cartMock: CartEntity = {
  active: true,
  id: 65456,
  userId: userMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
