import { ListCartDto } from 'src/cart/dto/list-cart.dto';
import { ListProductDto } from 'src/product/dto/list-product.dto';
import { ProductCartEntity } from '../entities/product-cart.entity';

export class ListProductCartDto {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: ListProductDto;
  cart?: ListCartDto;

  constructor(productCart: ProductCartEntity) {
    this.id = productCart.id;
    this.cartId = productCart.cartId;
    this.productId = productCart.productId;
    this.amount = productCart.amount;
    this.product = productCart.product
      ? new ListProductDto(productCart.product)
      : undefined;
    this.cart = productCart.cart
      ? new ListCartDto(productCart.cart)
      : undefined;
  }
}
