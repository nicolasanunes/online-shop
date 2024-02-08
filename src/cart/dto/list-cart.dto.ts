import { CartEntity } from '../entities/cart.entity';
import { ListProductCartDto } from '../../product-cart/dto/list-product-cart.dto';

export class ListCartDto {
  id: number;
  productCart?: ListProductCartDto[];

  constructor(cart: CartEntity) {
    this.id = cart.id;
    this.productCart = cart.productCart
      ? cart.productCart.map(
          (productCart) => new ListProductCartDto(productCart),
        )
      : undefined;
  }
}
