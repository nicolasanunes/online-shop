import { Test, TestingModule } from '@nestjs/testing';
import { ProductCartService } from '../product-cart.service';
import { ProductService } from '../../product/product.service';
import { Repository } from 'typeorm';
import { ProductCartEntity } from '../entities/product-cart.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../../product/__mock__/product.mock';
import { deleteProductMock } from '../../product/__mock__/delete-product.mock';
import { cartMock } from '../../cart/__mock__/cart.mock';
import { insertProductInCartMock } from '../../cart/__mock__/insert-product-in-cart.mock';
import { productCartMock } from '../__mock__/product-cart.mock';
import { NotFoundException } from '@nestjs/common';
import { updateProductInCartMock } from '../../cart/__mock__/update-product-in-cart.mock';

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
            findOne: jest.fn().mockResolvedValue(productCartMock),
            save: jest.fn().mockResolvedValue(productCartMock),
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
    const deleteResult = await productCartService.deleteProductInCart(
      productMock.id,
      cartMock.id,
    );

    expect(deleteResult).toEqual(deleteProductMock);
  });

  it('should return error in exception delete', async () => {
    jest.spyOn(productCartRepository, 'delete').mockRejectedValue(new Error());

    expect(
      productCartService.deleteProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError();
  });

  it('should return productCart after create', async () => {
    const productCart = await productCartService.createProductInCart(
      insertProductInCartMock,
      cartMock.id,
    );

    expect(productCart).toEqual(productCartMock);
  });

  it('should return error in exception createProductInCart', async () => {
    jest.spyOn(productCartRepository, 'save').mockRejectedValue(new Error());

    expect(
      productCartService.createProductInCart(
        insertProductInCartMock,
        cartMock.id,
      ),
    ).rejects.toThrowError();
  });

  it('should return productCart if exists', async () => {
    const productCart = await productCartService.verifyProductInCart(
      productMock.id,
      cartMock.id,
    );

    expect(productCart).toEqual(productCartMock);
  });

  it('should return error in exception verifyProductInCart', async () => {
    jest.spyOn(productCartRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      productCartService.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return error if not found', async () => {
    jest.spyOn(productCartRepository, 'findOne').mockRejectedValue(new Error());

    expect(
      productCartService.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(Error);
  });

  it('should return error in exception insertProductInCart', async () => {
    jest
      .spyOn(productService, 'findProductById')
      .mockRejectedValue(new NotFoundException());

    expect(
      productCartService.insertProductInCart(insertProductInCartMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return productCart if cart not exists', async () => {
    const spy = jest.spyOn(productCartRepository, 'save');

    jest.spyOn(productCartRepository, 'findOne').mockResolvedValue(undefined);

    const productCart = await productCartService.insertProductInCart(
      insertProductInCartMock,
      cartMock,
    );

    expect(productCart).toEqual(productCartMock);
    expect(spy.mock.calls[0][0].amount).toEqual(insertProductInCartMock.amount);
  });

  it('should return productCart if cart not exists', async () => {
    const spy = jest.spyOn(productCartRepository, 'save');

    const productCart = await productCartService.insertProductInCart(
      insertProductInCartMock,
      cartMock,
    );

    expect(productCart).toEqual(productCartMock);
    expect(spy.mock.calls[0][0]).toEqual({
      ...productCartMock,
      amount: productCartMock.amount + insertProductInCartMock.amount,
    });
  });

  it('should return error in exception updateProductInCart', async () => {
    jest
      .spyOn(productService, 'findProductById')
      .mockRejectedValue(new NotFoundException());

    expect(
      productCartService.updateProductInCart(updateProductInCartMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return productCart if cart not exists (updateProductInCart)', async () => {
    jest.spyOn(productCartRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      productCartService.updateProductInCart(updateProductInCartMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return productCart if cart not exists (updateProductInCart)', async () => {
    const spy = jest.spyOn(productCartRepository, 'save');

    const productCart = await productCartService.updateProductInCart(
      updateProductInCartMock,
      cartMock,
    );

    expect(productCart).toEqual(productCartMock);
    expect(spy.mock.calls[0][0].amount).toEqual(updateProductInCartMock.amount);
  });
});
