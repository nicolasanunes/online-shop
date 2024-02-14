import { productMock } from '../../product/__mock__/product.mock';
import { InsertProductInCartDto } from '../dto/insert-product-in-cart.dto';

export const insertProductInCartMock: InsertProductInCartDto = {
  amount: 454,
  productId: productMock.id,
};
