import { ListCategoryDto } from '../../category/dto/list-category.dto';
import { ProductEntity } from '../entities/product.entity';

export class ListProductDto {
  id: number;
  name: string;
  price: number;
  image: string;
  category: ListCategoryDto;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.price = productEntity.price;
    this.image = productEntity.image;
    this.category = productEntity.category
      ? new ListCategoryDto(productEntity.category)
      : undefined;
  }
}
