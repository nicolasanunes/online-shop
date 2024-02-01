import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mock__/product.mock';

describe('ProductService', () => {
  let productService: ProductService;
  let productRespository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            save: jest.fn().mockResolvedValue(productMock),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRespository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(productRespository).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await productService.listAllProducts();

    expect(products).toEqual([productMock]);
  });

  it('should return error if empty', async () => {
    jest.spyOn(productRespository, 'find').mockResolvedValue([]);

    expect(productService.listAllProducts()).rejects.toThrowError();
  });

  it('should return error in exception', async () => {
    jest.spyOn(productRespository, 'find').mockRejectedValue(new Error());

    expect(productService.listAllProducts()).rejects.toThrowError();
  });
});
