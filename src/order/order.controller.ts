import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { UserId } from '../decorator/user-id.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @UserId() userId: number,
  ) {
    return this.orderService.createOrder(createOrderDto, userId);
  }

  @Get()
  async findOrdersByUserId(@UserId() userId: number) {
    return this.orderService.findOrdersByUserId(userId);
  }
}
