import { PaymentPixEntity } from '../entities/payment-pix.entity';
import { paymentMock } from './payment.mock';

export const paymentPixMock: PaymentPixEntity = {
  ...paymentMock,
  code: 'sffds',
  datePayment: new Date(),
};
