import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InsertProductInCartDto } from './dto/insert-product-in-cart.dto';
import { CartService } from './cart.service';
import { UserId } from '../decorator/user-id.decorator';
import { Roles } from '../decorator/role.decorator';
import { UserTypeEnum } from '../user/enum/user-type.enum';
import { ListCartDto } from './dto/list-cart.dto';
import { DeleteResult } from 'typeorm';
import { UpdateProductInCartDto } from './dto/update-product-in-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
  @UsePipes(ValidationPipe)
  @Post()
  async insertProductInCart(
    @Body() insertProductInCart: InsertProductInCartDto,
    @UserId() userId: number,
  ): Promise<ListCartDto> {
    return new ListCartDto(
      await this.cartService.insertProductInCart(insertProductInCart, userId),
    );
  }

  @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
  @Get()
  async findCartByUserId(@UserId() userId: number): Promise<ListCartDto> {
    return new ListCartDto(
      await this.cartService.findCartByUserId(userId, true),
    );
  }

  @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
  @Delete()
  async clearCart(@UserId() userId: number): Promise<DeleteResult> {
    return this.cartService.clearCart(userId);
  }

  @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
  @Delete('/product/:productId')
  async deleteProductCart(
    @Param('productId') productId: number,
    @UserId() userId: number,
  ): Promise<DeleteResult> {
    return this.cartService.deleteProductCart(productId, userId);
  }

  @UsePipes(ValidationPipe)
  @Patch()
  async updateProductInCart(
    @Body() updateProductInCart: UpdateProductInCartDto,
    @UserId() userId: number,
  ): Promise<ListCartDto> {
    return new ListCartDto(
      await this.cartService.updateProductInCart(updateProductInCart, userId),
    );
  }
}
