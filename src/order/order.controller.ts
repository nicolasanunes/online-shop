import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { UserId } from '../decorator/user-id.decorator';
import { OrderEntity } from './entities/order.entity';
import { UserTypeEnum } from '../user/enum/user-type.enum';
import { Roles } from '../decorator/role.decorator';
import { ListOrderDto } from './dto/list-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
  @Post()
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @UserId() userId: number,
  ): Promise<OrderEntity> {
    return this.orderService.createOrder(createOrderDto, userId);
  }

  @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
  @Get()
  async findOrdersByUserId(@UserId() userId: number) {
    return this.orderService.findOrdersByUserId(userId);
  }

  @Roles(UserTypeEnum.Admin)
  @Get('/all')
  async findAllOrders(): Promise<ListOrderDto[]> {
    return (await this.orderService.findAllOrders()).map(
      (order) => new ListOrderDto(order),
    );
  }

  @Roles(UserTypeEnum.Admin)
  @Get('/:orderId')
  async findOrderById(
    @Param('orderId') orderId: number,
  ): Promise<ListOrderDto> {
    return new ListOrderDto(
      (await this.orderService.findOrdersByUserId(undefined, orderId))[0],
    );
  }
}
