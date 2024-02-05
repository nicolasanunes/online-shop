import { Test, TestingModule } from '@nestjs/testing';
import { ProductCartService } from './product-cart.service';

describe('ProductCartService', () => {
  let service: ProductCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCartService],
    }).compile();

    service = module.get<ProductCartService>(ProductCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
