import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';
import { orderMock } from '../__mock__/order.mock';
import { createOrderPixMock } from '../__mock__/create-order.mock';
import { userMock } from '../../user/__mock__/user.mock';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn().mockResolvedValue(orderMock),
            findOrdersByUserId: jest.fn().mockResolvedValue([orderMock]),
            findAllOrders: jest.fn().mockResolvedValue([orderMock]),
          },
        },
      ],
      controllers: [OrderController],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
    expect(orderService).toBeDefined();
  });

  it('should return order in createOrder', async () => {
    const order = await orderController.createOrder(
      createOrderPixMock,
      userMock.id,
    );

    expect(order).toEqual(orderMock);
  });

  it('should return orders in findOrdersByUserId', async () => {
    const orders = await orderController.findOrdersByUserId(userMock.id);

    expect(orders).toEqual([orderMock]);
  });

  it('should return orders in findAllOrders', async () => {
    const spy = jest.spyOn(orderService, 'findAllOrders');
    const orders = await orderController.findAllOrders();

    expect(orders).toEqual([
      {
        id: orderMock.id,
        date: orderMock.date.toString(),
      },
    ]);
    expect(spy.mock.calls.length).toEqual(1);
  });
});
