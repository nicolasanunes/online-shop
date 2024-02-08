import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InsertProductInCartDto } from './dto/insert-product-in-cart.dto';
import { ProductCartService } from 'src/product-cart/product-cart.service';
import { UpdateProductInCartDto } from './dto/update-product-in-cart.dto';

const LINE_AFFECTED = 1;
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
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.productCartService.insertProductInCart(
      insertProductInCartDto,
      cart,
    );

    return cart;
  }

  async findCartByUserId(
    userId: number,
    isRelations?: boolean,
  ): Promise<CartEntity> {
    const relations = isRelations
      ? {
          productCart: {
            product: true,
          },
        }
      : undefined;

    const cart = await this.cartRepository.findOne({
      where: {
        userId,
        active: true,
      },
      relations,
    });

    if (!cart) {
      throw new NotFoundException(`Cart active not found`);
    }

    return cart;
  }

  async clearCart(userId: number): Promise<DeleteResult> {
    const cart = await this.findCartByUserId(userId);

    await this.cartRepository.save({
      ...cart,
      active: false,
    });

    return {
      raw: [],
      affected: LINE_AFFECTED,
    };
  }

  async deleteProductCart(
    productId: number,
    userId: number,
  ): Promise<DeleteResult> {
    const cart = await this.findCartByUserId(userId);

    return this.productCartService.deleteProductCart(productId, cart.id);
  }

  async updateProductInCart(
    updateProductInCartDto: UpdateProductInCartDto,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.productCartService.updateProductInCart(
      updateProductInCartDto,
      cart,
    );

    return cart;
  }
}
