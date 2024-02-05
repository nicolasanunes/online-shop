import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorator/role.decorator';
import { UserTypeEnum } from '../user/enum/user-type.enum';
import { ListProductDto } from './dto/list-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Roles(UserTypeEnum.Admin, UserTypeEnum.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }

  @Get()
  async listAllProducts(): Promise<ListProductDto[]> {
    return (await this.productService.listAllProducts()).map(
      (product) => new ListProductDto(product),
    );
  }
}
