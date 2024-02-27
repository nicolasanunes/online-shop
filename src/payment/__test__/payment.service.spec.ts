import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../payment.service';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { paymentMock } from '../__mock__/payment.mock';
import {
  createOrderCreditCardMock,
  createOrderPixMock,
} from '../../order/__mock__/create-order.mock';
import { productMock } from '../../product/__mock__/product.mock';
import { cartMock } from '../../cart/__mock__/cart.mock';
import { paymentPixMock } from '../__mock__/payment-pix.mock';
import { PaymentPixEntity } from '../entities/payment-pix.entity';
import { PaymentCreditCardEntity } from '../entities/payment-credit-card.entity';
import { paymentCreditCardMock } from '../__mock__/payment-credit-card.mock';
import { BadRequestException } from '@nestjs/common';

describe('PaymentService', () => {
  let paymentService: PaymentService;
  let paymentRepository: Repository<PaymentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(PaymentEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(paymentMock),
          },
        },
        PaymentService,
      ],
    }).compile();

    paymentService = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get<Repository<PaymentEntity>>(
      getRepositoryToken(PaymentEntity),
    );
  });

  it('should be defined', () => {
    expect(paymentService).toBeDefined();
    expect(paymentRepository).toBeDefined();
  });

  it('should save payment pix in db', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    const payment = await paymentService.createPayment(
      createOrderPixMock,
      [productMock],
      cartMock,
    );

    const savedPixPayment: PaymentPixEntity = spy.mock
      .calls[0][0] as PaymentPixEntity;

    expect(payment).toEqual(paymentMock);
    expect(savedPixPayment.code).toEqual(paymentPixMock.code);
    //expect(savedPixPayment.datePayment).toEqual(paymentPixMock.datePayment);
  });

  it('should save payment credit card in db', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    const payment = await paymentService.createPayment(
      createOrderCreditCardMock,
      [productMock],
      cartMock,
    );

    const savedCreditCardPayment: PaymentCreditCardEntity = spy.mock
      .calls[0][0] as PaymentCreditCardEntity;

    expect(payment).toEqual(paymentMock);
    expect(savedCreditCardPayment.amountPayments).toEqual(
      paymentCreditCardMock.amountPayments,
    );
  });

  it('should return exception in not send data', async () => {
    expect(
      paymentService.createPayment(
        {
          addressId: createOrderCreditCardMock.addressId,
        },
        [productMock],
        cartMock,
      ),
    ).rejects.toThrowError(BadRequestException);
  });
});
