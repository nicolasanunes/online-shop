import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaymentService } from '../../payment/payment.service';
import { CartService } from '../../cart/cart.service';
import { OrderProductService } from '../../order-product/order-product.service';
import { ProductService } from '../../product/product.service';
import { orderMock } from '../__mock__/order.mock';
import { userMock } from '../../user/__mock__/user.mock';
import { NotFoundException } from '@nestjs/common';
import { orderProductMock } from '../../order-product/mock/order.product.mock';
import { cartMock } from '../../cart/__mock__/cart.mock';
import { productMock } from '../../product/__mock__/product.mock';
import { productCartMock } from '../../product-cart/__mock__/product-cart.mock';
import { createOrderPixMock } from '../__mock__/create-order.mock';
import { paymentMock } from '../../payment/__mock__/payment.mock';

jest.useFakeTimers().setSystemTime(new Date('01-01-2019'));

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository: Repository<OrderEntity>;
  let paymentService: PaymentService;
  let cartService: CartService;
  let orderProductService: OrderProductService;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([orderMock]),
            save: jest.fn().mockResolvedValue(orderMock),
          },
        },
        {
          provide: PaymentService,
          useValue: {
            createPayment: jest.fn().mockResolvedValue(paymentMock),
          },
        },
        {
          provide: CartService,
          useValue: {
            findCartByUserId: jest.fn().mockResolvedValue({
              ...cartMock,
              productCart: [productCartMock],
            }),
            clearCart: jest.fn(),
          },
        },
        {
          provide: OrderProductService,
          useValue: {
            createOrderProduct: jest.fn().mockResolvedValue(orderProductMock),
          },
        },
        {
          provide: ProductService,
          useValue: {
            listAllProducts: jest.fn().mockResolvedValue([productMock]),
          },
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderRepository = module.get<Repository<OrderEntity>>(
      getRepositoryToken(OrderEntity),
    );
    paymentService = module.get<PaymentService>(PaymentService);
    cartService = module.get<CartService>(CartService);
    orderProductService = module.get<OrderProductService>(OrderProductService);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
    expect(orderRepository).toBeDefined();
    expect(paymentService).toBeDefined();
    expect(cartService).toBeDefined();
    expect(orderProductService).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return orders in findOrdersByUserId', async () => {
    const spy = jest.spyOn(orderRepository, 'find');
    const orders = await orderService.findOrdersByUserId(userMock.id);

    expect(orders).toEqual([orderMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      where: {
        userId: userMock.id,
      },
      relations: {
        address: true,
        ordersProduct: {
          product: true,
        },
        payment: {
          paymentStatus: true,
        },
      },
    });
  });

  it('should return not found exception in return empty', async () => {
    jest.spyOn(orderRepository, 'find').mockResolvedValue([]);

    expect(orderService.findOrdersByUserId(userMock.id)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should call createOrderProduct amount cartProduct in cart', async () => {
    const spy = jest.spyOn(orderProductService, 'createOrderProduct');

    const createOrderProductUsingCart =
      await orderService.createOrderProductUsingCart(
        {
          ...cartMock,
          productCart: [productCartMock, productCartMock],
        },
        orderMock.id,
        [productMock],
      );

    expect(createOrderProductUsingCart).toEqual([
      orderProductMock,
      orderProductMock,
    ]);
    expect(spy.mock.calls.length).toEqual(2);
  });

  it('should return order in saveOrder', async () => {
    const spy = jest.spyOn(orderRepository, 'save');

    const order = await orderService.saveOrder(
      createOrderPixMock,
      userMock.id,
      paymentMock,
    );

    expect(order).toEqual(orderMock);
    expect(spy.mock.calls[0][0]).toEqual({
      addressId: createOrderPixMock.addressId,
      date: new Date(),
      paymentId: paymentMock.id,
      userId: userMock.id,
    });
  });

  it('should return exception in error save', async () => {
    jest.spyOn(orderRepository, 'save').mockRejectedValue(new Error());

    expect(
      orderService.saveOrder(createOrderPixMock, userMock.id, paymentMock),
    ).rejects.toThrowError();
  });

  it('should return order in createOrder success', async () => {
    const spyCartService = jest.spyOn(cartService, 'findCartByUserId');
    const spyCartServiceClearCart = jest.spyOn(cartService, 'clearCart');
    const spyProductService = jest.spyOn(productService, 'listAllProducts');
    const spyPaymentService = jest.spyOn(paymentService, 'createPayment');
    const spyOrderProductService = jest.spyOn(
      orderProductService,
      'createOrderProduct',
    );
    const spyOrderRepository = jest.spyOn(orderRepository, 'save');

    const order = await orderService.createOrder(
      createOrderPixMock,
      userMock.id,
    );

    expect(order).toEqual(orderMock);
    expect(spyCartService.mock.calls.length).toEqual(1);
    expect(spyCartServiceClearCart.mock.calls.length).toEqual(1);
    expect(spyProductService.mock.calls.length).toEqual(1);
    expect(spyPaymentService.mock.calls.length).toEqual(1);
    expect(spyOrderProductService.mock.calls.length).toEqual(1);
    expect(spyOrderRepository.mock.calls.length).toEqual(1);
  });
});
