import { ListAddressDto } from '../../address/dto/list-address.dto';
import { ListUserDto } from '../../user/dto/list-user.dto';
import { OrderEntity } from '../entities/order.entity';
import { ListPaymentDto } from '../../payment/dto/list-payment.dto';
import { ListOrderProductDto } from '../../order-product/dto/list-order-product.dto';

export class ListOrderDto {
  id: number;
  date: string;
  userId: number;
  addressId: number;
  paymentId: number;
  user?: ListUserDto;
  address?: ListAddressDto;
  payment?: ListPaymentDto;
  ordersProduct?: ListOrderProductDto[];

  constructor(order: OrderEntity) {
    this.id = order.id;
    this.date = order.date.toString();
    this.userId = order.userId;
    this.addressId = order.addressId;
    this.paymentId = order.paymentId;
    this.user = order.user ? new ListUserDto(order.user) : undefined;
    this.address = order.address
      ? new ListAddressDto(order.address)
      : undefined;
    this.payment = order.payment
      ? new ListPaymentDto(order.payment)
      : undefined;
    this.ordersProduct = order.ordersProduct
      ? order.ordersProduct.map(
          (orderProduct) => new ListOrderProductDto(orderProduct),
        )
      : undefined;
  }
}
