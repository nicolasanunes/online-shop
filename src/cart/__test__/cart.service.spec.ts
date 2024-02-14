import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductCartService } from '../../product-cart/product-cart.service';
import { deleteCartMock } from '../__mock__/delete-cart.mock';
import { cartMock } from '../__mock__/cart.mock';
import { userMock } from '../../user/__mock__/user.mock';

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
});
