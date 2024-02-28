import { ListUserDto } from '../../user/dto/list-user.dto';
import { OrderEntity } from '../entities/order.entity';

export class ListOrderDto {
  id: number;
  date: string;
  user?: ListUserDto;

  constructor(order: OrderEntity) {
    this.id = order.id;
    this.date = order.date.toString();
    this.user = order.user ? new ListUserDto(order.user) : undefined;
  }
}
