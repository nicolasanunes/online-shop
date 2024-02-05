import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mock__/product.mock';
import { createProductMock } from '../__mock__/create-product.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mock__/category.mock';
import { deleteProductMock } from '../__mock__/delete-product.mock';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            listCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            findOne: jest.fn().mockResolvedValue(productMock),
            save: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue(deleteProductMock),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(productRepository).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await productService.listAllProducts();

    expect(products).toEqual([productMock]);
  });

  it('should return error if empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);

    expect(productService.listAllProducts()).rejects.toThrowError();
  });

  it('should return error in exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

    expect(productService.listAllProducts()).rejects.toThrowError();
  });

  it('should return createProduct', async () => {
    const product = await productService.createProduct(createProductMock);

    expect(product).toEqual(productMock);
  });

  //it('should return product after insert in db', async () => {
  //  jest
  //    .spyOn(categoryService, 'listCategoryById')
  //    .mockRejectedValue(new Error());
  //
  //  expect(
  //    productService.createProduct(createProductMock),
  //  ).rejects.toThrowError();
  //});

  it('should return product in findProductById', async () => {
    const product = await productService.findProductById(productMock.id);

    expect(product).toEqual(productMock);
  });

  it('should return error if product not found', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      productService.findProductById(productMock.id),
    ).rejects.toThrowError();
  });

  it('should return deleted true in deleteProduct', async () => {
    const deletedProduct = await productService.deleteProduct(productMock.id);

    expect(deletedProduct).toEqual(deleteProductMock);
  });
});
