import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorator/role.decorator';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';
import { ListProductDto } from './dto/list-product.dto';
import { ProductService } from './product.service';

@Roles(UserTypeEnum.Admin, UserTypeEnum.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async listAllProducts(): Promise<ListProductDto[]> {
    return (await this.productService.listAllProducts()).map(
      (product) => new ListProductDto(product),
    );
  }
}
