import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCartEntity } from './entities/product-cart.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InsertProductInCartDto } from 'src/cart/dto/insert-product-in-cart.dto';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { ProductService } from 'src/product/product.service';
import { UpdateProductInCartDto } from 'src/cart/dto/update-product-in-cart.dto';

@Injectable()
export class ProductCartService {
  constructor(
    @InjectRepository(ProductCartEntity)
    private readonly productCartRepository: Repository<ProductCartEntity>,
    private readonly productService: ProductService,
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
    await this.productService.findProductById(insertProductInCartDto.productId);

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

  async deleteProductCart(
    productId: number,
    cartId: number,
  ): Promise<DeleteResult> {
    return this.productCartRepository.delete({ productId, cartId });
  }

  async updateProductInCart(
    updateProductInCartDto: UpdateProductInCartDto,
    cart: CartEntity,
  ): Promise<ProductCartEntity> {
    await this.productService.findProductById(updateProductInCartDto.productId);

    const productCart = await this.verifyProductInCart(
      updateProductInCartDto.productId,
      cart.id,
    );

    return this.productCartRepository.save({
      ...productCart,
      amount: updateProductInCartDto.amount,
    });
  }
}
