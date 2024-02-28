import { ListOrderDto } from '../../order/dto/list-order.dto';
import { ListProductDto } from '../../product/dto/list-product.dto';
import { OrderProductEntity } from '../entities/order-product.entity';

export class ListOrderProductDto {
  id: number;
  orderId: number;
  productId: number;
  amount: number;
  price: number;
  order?: ListOrderDto;
  product?: ListProductDto;

  constructor(orderProduct: OrderProductEntity) {
    this.id = orderProduct.id;
    this.orderId = orderProduct.orderId;
    this.productId = orderProduct.productId;
    this.amount = orderProduct.amount;
    this.price = orderProduct.price;
    this.order = orderProduct.order
      ? new ListOrderDto(orderProduct.order)
      : undefined;
    this.product = orderProduct.product
      ? new ListProductDto(orderProduct.product)
      : undefined;
  }
}
