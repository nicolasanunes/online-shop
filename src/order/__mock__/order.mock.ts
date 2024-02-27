import { addressMock } from '../../address/__mock__/address.mock';
import { OrderEntity } from '../entities/order.entity';
import { paymentMock } from '../../payment/__mock__/payment.mock';
import { userMock } from '../../user/__mock__/user.mock';

export const orderMock: OrderEntity = {
  id: 453543,
  addressId: addressMock.id,
  date: new Date(),
  paymentId: paymentMock.id,
  userId: userMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
