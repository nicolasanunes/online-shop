import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from '../cart.controller';
import { CartService } from '../cart.service';
import { cartMock } from '../__mock__/cart.mock';
import { insertProductInCartMock } from '../__mock__/insert-product-in-cart.mock';
import { userMock } from '../../user/__mock__/user.mock';
import { deleteCartMock } from '../__mock__/delete-cart.mock';
import { updateProductInCartMock } from '../__mock__/update-product-in-cart.mock';

describe('CartController', () => {
  let cartController: CartController;
  let cartService: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CartService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(cartMock),
            findCartByUserId: jest.fn().mockResolvedValue(cartMock),
            clearCart: jest.fn().mockResolvedValue(deleteCartMock),
            updateProductInCart: jest.fn().mockResolvedValue(cartMock),
          },
        },
      ],
      controllers: [CartController],
    }).compile();

    cartController = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(cartController).toBeDefined();
    expect(cartService).toBeDefined();
  });

  it('should return cartEntity in insertProductInCart', async () => {
    const cart = await cartController.insertProductInCart(
      insertProductInCartMock,
      userMock.id,
    );

    expect(cart).toEqual({
      id: cartMock.id,
    });
  });

  it('should return cartEntity in findCartByUserId', async () => {
    const cart = await cartController.findCartByUserId(userMock.id);

    expect(cart).toEqual({
      id: cartMock.id,
    });
  });

  it('should return DeleteResult in clearCart', async () => {
    const cart = await cartController.clearCart(userMock.id);

    expect(cart).toEqual(deleteCartMock);
  });

  it('should return cartEntity in updateProductInCart', async () => {
    const cart = await cartController.updateProductInCart(
      updateProductInCartMock,
      userMock.id,
    );

    expect(cart).toEqual({
      id: cartMock.id,
    });
  });
});
