import { PaymentTypeEnum } from 'src/payment-status/enum/payment-type.enum';
import { PaymentEntity } from '../entities/payment.entity';

export const paymentMock: PaymentEntity = {
  id: 232,
  statusId: PaymentTypeEnum.Done,
  discount: 213,
  finalPrice: 3234,
  price: 21,
  type: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};
