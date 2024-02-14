import { cartMock } from '../../cart/__mock__/cart.mock';
import { ProductCartEntity } from '../entities/product-cart.entity';
import { productMock } from '../../product/__mock__/product.mock';

export const productCartMock: ProductCartEntity = {
  amount: 4565,
  cartId: cartMock.id,
  id: 321,
  productId: productMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
