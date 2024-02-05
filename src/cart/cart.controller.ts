import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartEntity } from './entities/cart.entity';
import { InsertProductInCartDto } from './dto/insert-product-in-cart.dto';
import { CartService } from './cart.service';
import { UserId } from 'src/decorator/user-id.decorator';
import { Roles } from 'src/decorator/role.decorator';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
  @UsePipes(ValidationPipe)
  @Post()
  async insertProductInCart(
    @Body() insertProductInCart: InsertProductInCartDto,
    @UserId() userId: number,
  ): Promise<CartEntity> {
    return this.cartService.insertProductInCart(insertProductInCart, userId);
  }
}
