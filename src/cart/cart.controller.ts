import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InsertProductInCartDto } from './dto/insert-product-in-cart.dto';
import { CartService } from './cart.service';
import { UserId } from 'src/decorator/user-id.decorator';
import { Roles } from 'src/decorator/role.decorator';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';
import { ListCartDto } from './dto/list-cart.dto';

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
}
