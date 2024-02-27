import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { PaymentModule } from '../payment/payment.module';
import { CartModule } from '../cart/cart.module';
import { OrderProductModule } from '../order-product/order-product.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    PaymentModule,
    CartModule,
    OrderProductModule,
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
