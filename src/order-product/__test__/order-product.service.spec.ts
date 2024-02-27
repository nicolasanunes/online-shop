import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductService } from '../order-product.service';
import { Repository } from 'typeorm';
import { OrderProductEntity } from '../entities/order-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('OrderProductService', () => {
  let orderProductService: OrderProductService;
  let orderProductRepository: Repository<OrderProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(OrderProductEntity),
          useValue: {
            save: jest.fn(),
          },
        },
        OrderProductService,
      ],
    }).compile();

    orderProductService = module.get<OrderProductService>(OrderProductService);
    orderProductRepository = module.get<Repository<OrderProductEntity>>(
      getRepositoryToken(OrderProductEntity),
    );
  });

  it('should be defined', () => {
    expect(orderProductService).toBeDefined();
    expect(orderProductRepository).toBeDefined();
  });
});
