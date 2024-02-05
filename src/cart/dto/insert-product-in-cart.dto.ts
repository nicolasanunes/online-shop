import { IsNumber } from 'class-validator';

export class InsertProductInCartDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;
}
