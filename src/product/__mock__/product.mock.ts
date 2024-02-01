import { categoryMock } from '../../category/__mock__/category.mock';
import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  id: 4321,
  categoryId: categoryMock.id,
  image: 'hhtp://image.com',
  name: 'nameProductMock',
  price: 34.3,
  createdAt: new Date(),
  updatedAt: new Date(),
};
