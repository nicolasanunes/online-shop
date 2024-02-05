import { categoryMock } from '../../category/__mock__/category.mock';
import { UpdateProductDto } from '../dto/update-product.dto';

export const updateProductMock: UpdateProductDto = {
  categoryId: categoryMock.id,
  image: 'https://imagdsfdsfe.com',
  name: 'nameUpdateProduckMock',
  price: 28.0,
};
