import { Module } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';

@Module({
  providers: [ProductCartService]
})
export class ProductCartModule {}
