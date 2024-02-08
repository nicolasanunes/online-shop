import { Module } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCartEntity } from './entities/product-cart.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCartEntity]), ProductModule],
  providers: [ProductCartService],
  exports: [ProductCartService],
})
export class ProductCartModule {}
