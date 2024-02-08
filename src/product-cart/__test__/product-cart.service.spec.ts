import { Test, TestingModule } from '@nestjs/testing';
import { ProductCartService } from '../product-cart.service';
import { ProductService } from '../../product/product.service';
import { Repository } from 'typeorm';
import { ProductCartEntity } from '../entities/product-cart.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../../product/__mock__/product.mock';
import { deleteProductMock } from '../../product/__mock__/delete-product.mock';
import { cartMock } from '../../cart/__mock__/cart.mock';

describe('ProductCartService', () => {
  let productCartService: ProductCartService;
  let productService: ProductService;
  let productCartRepository: Repository<ProductCartEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            findProductById: jest.fn().mockResolvedValue(productMock),
          },
        },
        {
          provide: getRepositoryToken(ProductCartEntity),
          useValue: {
            findOne: '',
            save: '',
            delete: jest.fn().mockResolvedValue(deleteProductMock),
          },
        },
        ProductCartService,
      ],
    }).compile();

    productCartService = module.get<ProductCartService>(ProductCartService);
    productService = module.get<ProductService>(ProductService);
    productCartRepository = module.get<Repository<ProductCartEntity>>(
      getRepositoryToken(ProductCartEntity),
    );
  });

  it('should be defined', () => {
    expect(productCartService).toBeDefined();
    expect(productService).toBeDefined();
    expect(productCartRepository).toBeDefined();
  });

  it('should return DeleteResult after delete some product', async () => {
    const deleteResult = await productCartService.deleteProductCart(
      productMock.id,
      cartMock.id,
    );

    expect(deleteResult).toEqual(deleteProductMock);
  });

  it('should return error in exception delete', async () => {
    jest.spyOn(productCartRepository, 'delete').mockRejectedValue(new Error());

    expect(
      productCartService.deleteProductCart(productMock.id, cartMock.id),
    ).rejects.toThrowError();
  });
});
