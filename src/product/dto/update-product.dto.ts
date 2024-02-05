import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  categoryId: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;
}
