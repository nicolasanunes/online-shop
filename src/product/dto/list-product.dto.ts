import { ProductEntity } from '../entities/product.entity';

export class ListProductDto {
  id: number;
  name: string;
  price: number;
  image: string;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.price = productEntity.price;
    this.image = productEntity.image;
  }
}
