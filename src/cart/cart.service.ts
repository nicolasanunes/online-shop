import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InsertProductInCartDto } from './dto/insert-product-in-cart.dto';
import { ProductCartService } from 'src/product-cart/product-cart.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly productCartService: ProductCartService,
  ) {}

  async createCart(userId: number): Promise<CartEntity> {
    return this.cartRepository.save({
      active: true,
      userId,
    });
  }

  async insertProductInCart(
    insertProductInCartDto: InsertProductInCartDto,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.verifyActiveCart(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.productCartService.insertProductInCart(
      insertProductInCartDto,
      cart,
    );

    return cart;
  }

  async verifyActiveCart(userId: number): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne({
      where: {
        userId,
      },
    });

    if (!cart) {
      throw new NotFoundException(`Cart active not found`);
    }

    return cart;
  }
}
