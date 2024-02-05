import { Module } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCartEntity } from './entities/product-cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCartEntity])],
  providers: [ProductCartService],
  exports: [ProductCartService],
})
export class ProductCartModule {}
