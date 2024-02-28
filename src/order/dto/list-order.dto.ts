import { ListAddressDto } from '../../address/dto/list-address.dto';
import { ListUserDto } from '../../user/dto/list-user.dto';
import { OrderEntity } from '../entities/order.entity';
import { ListPaymentDto } from '../../payment/dto/list-payment.dto';
import { OrderProductEntity } from 'src/order-product/entities/order-product.entity';

export class ListOrderDto {
  id: number;
  date: string;
  user?: ListUserDto;
  address?: ListAddressDto;
  payment?: ListPaymentDto;
  ordersProduct?: OrderProductEntity[];

  constructor(order: OrderEntity) {
    this.id = order.id;
    this.date = order.date.toString();
    this.user = order.user ? new ListUserDto(order.user) : undefined;
    this.address = order.address
      ? new ListAddressDto(order.address)
      : undefined;
    this.payment = order.payment
      ? new ListPaymentDto(order.payment)
      : undefined;
    this.ordersProduct = order.ordersProduct;
  }
}
