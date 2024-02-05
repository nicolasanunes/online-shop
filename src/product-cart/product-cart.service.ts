import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCartEntity } from './entities/product-cart.entity';
import { Repository } from 'typeorm';
import { InsertProductInCartDto } from 'src/cart/dto/insert-product-in-cart.dto';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Injectable()
export class ProductCartService {
  constructor(
    @InjectRepository(ProductCartEntity)
    private readonly productCartRepository: Repository<ProductCartEntity>,
  ) {}

  async verifyProductInCart(
    productId: number,
    cartId: number,
  ): Promise<ProductCartEntity> {
    const productCart = await this.productCartRepository.findOne({
      where: {
        productId,
        cartId,
      },
    });

    if (!productCart) {
      throw new NotFoundException(`Product not found in cart`);
    }

    return productCart;
  }

  async insertProductInCart(
    insertProductInCartDto: InsertProductInCartDto,
    cart: CartEntity,
  ): Promise<ProductCartEntity> {
    const productCart = await this.verifyProductInCart(
      insertProductInCartDto.productId,
      cart.id,
    ).catch(() => undefined);

    if (!productCart) {
      return this.createProductInCart(insertProductInCartDto, cart.id);
    }

    return this.productCartRepository.save({
      ...productCart,
      amount: productCart.amount + insertProductInCartDto.amount,
    });
  }

  createProductInCart(
    insertProductInCartDto: InsertProductInCartDto,
    cartId: number,
  ): Promise<ProductCartEntity> {
    return this.productCartRepository.save({
      amount: insertProductInCartDto.amount,
      productId: insertProductInCartDto.productId,
      cartId,
    });
  }
}
