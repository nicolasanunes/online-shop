import { productMock } from '../../product/__mock__/product.mock';
import { orderMock } from '../../order/__mock__/order.mock';
import { OrderProductEntity } from '../entities/order-product.entity';

export const orderProductMock: OrderProductEntity = {
  id: 45543,
  amount: 543,
  orderId: orderMock.id,
  price: 543.4,
  productId: productMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
