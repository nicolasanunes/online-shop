import { IsNumber } from 'class-validator';

export class UpdateProductInCartDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;
}
