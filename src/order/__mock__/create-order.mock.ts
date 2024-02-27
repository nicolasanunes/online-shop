import { paymentPixMock } from '../../payment/__mock__/payment-pix.mock';
import { addressMock } from '../../address/__mock__/address.mock';
import { CreateOrderDto } from '../dto/create-order.dto';
import { paymentCreditCardMock } from '../../payment/__mock__/payment-credit-card.mock';

export const createOrderPixMock: CreateOrderDto = {
  addressId: addressMock.id,
  codePix: paymentPixMock.code,
  datePayment: '19-01-2019',
};

export const createOrderCreditCardMock: CreateOrderDto = {
  addressId: addressMock.id,
  amountPayments: paymentCreditCardMock.amountPayments,
};
