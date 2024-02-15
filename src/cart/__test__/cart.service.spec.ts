import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductCartService } from '../../product-cart/product-cart.service';
import { deleteCartMock } from '../__mock__/delete-cart.mock';
import { cartMock } from '../__mock__/cart.mock';
import { userMock } from '../../user/__mock__/user.mock';
import { NotFoundException } from '@nestjs/common';
import { insertProductInCartMock } from '../__mock__/insert-product-in-cart.mock';

describe('CartService', () => {
  let cartService: CartService;
  let cartRepository: Repository<CartEntity>;
  let productCartService: ProductCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: ProductCartService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(undefined),
            deleteProductInCart: jest.fn().mockResolvedValue(deleteCartMock),
            updateProductInCart: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: getRepositoryToken(CartEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(cartMock),
            findOne: jest.fn().mockResolvedValue(cartMock),
          },
        },
      ],
    }).compile();

    cartService = module.get<CartService>(CartService);
    productCartService = module.get<ProductCartService>(ProductCartService);
    cartRepository = module.get<Repository<CartEntity>>(
      getRepositoryToken(CartEntity),
    );
  });

  it('should be defined', () => {
    expect(cartService).toBeDefined();
    expect(cartRepository).toBeDefined();
    expect(productCartService).toBeDefined();
  });

  it('should return deleteResult if deleteCart', async () => {
    const spy = jest.spyOn(cartRepository, 'save');

    const deleteResult = await cartService.clearCart(userMock.id);

    expect(deleteResult).toEqual(deleteCartMock);
    expect(spy.mock.calls[0][0]).toEqual({
      ...cartMock,
      active: false,
    });
  });

  it('should return error inf findOne undefined', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    expect(cartService.clearCart(userMock.id)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should return cart in success (relation not sent)', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');

    const cart = await cartService.findCartByUserId(userMock.id);

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls[0][0].relations).toEqual(undefined);
  });

  it('should return cart in success (relation sent)', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');

    const cart = await cartService.findCartByUserId(userMock.id, true);

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls[0][0].relations).toEqual({
      productCart: {
        product: true,
      },
    });
  });

  it('should NotFoundException if cart not found', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      cartService.findCartByUserId(userMock.id, true),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return info in createCart', async () => {
    const spy = jest.spyOn(cartRepository, 'save');

    const cart = await cartService.createCart(userMock.id);

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls[0][0]).toEqual({
      active: true,
      userId: userMock.id,
    });
  });

  it('should return new cart if cart not found', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    const spy = jest.spyOn(cartRepository, 'save');
    const spyProductCartService = jest.spyOn(
      productCartService,
      'insertProductInCart',
    );

    const cart = await cartService.insertProductInCart(
      insertProductInCartMock,
      userMock.id,
    );

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls.length).toEqual(1);
    expect(spyProductCartService.mock.calls.length).toEqual(1);
  });

  it('should return cart if cart found', async () => {
    const spy = jest.spyOn(cartRepository, 'save');
    const spyProductCartService = jest.spyOn(
      productCartService,
      'insertProductInCart',
    );

    const cart = await cartService.insertProductInCart(
      insertProductInCartMock,
      userMock.id,
    );

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls.length).toEqual(0);
    expect(spyProductCartService.mock.calls.length).toEqual(1);
  });
});
