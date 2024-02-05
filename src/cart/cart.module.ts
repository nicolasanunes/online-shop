import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { ProductCartModule } from 'src/product-cart/product-cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), ProductCartModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
