import { productMock } from '../../product/__mock__/product.mock';
import { UpdateProductInCartDto } from '../dto/update-product-in-cart.dto';

export const updateProductInCartMock: UpdateProductInCartDto = {
  amount: 4154,
  productId: productMock.id,
};
