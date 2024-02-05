import { categoryMock } from '../../category/__mock__/category.mock';
import { CreateProductDto } from '../dto/create-product.dto';

export const createProductMock: CreateProductDto = {
  categoryId: categoryMock.id,
  image: 'https://image.com',
  name: 'nameProduckMock',
  price: 25.0,
};
