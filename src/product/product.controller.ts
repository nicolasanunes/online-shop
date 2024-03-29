import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorator/role.decorator';
import { UserTypeEnum } from '../user/enum/user-type.enum';
import { ListProductDto } from './dto/list-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteResult } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserTypeEnum.Admin, UserTypeEnum.Root)
  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }

  @Roles(UserTypeEnum.Admin, UserTypeEnum.Root, UserTypeEnum.User)
  @Get()
  async listAllProducts(): Promise<ListProductDto[]> {
    return (await this.productService.listAllProducts([], true)).map(
      (product) => new ListProductDto(product),
    );
  }

  @Roles(UserTypeEnum.Admin, UserTypeEnum.Root, UserTypeEnum.User)
  @Get('/:productId')
  async findProductById(
    @Param('productId') productId: number,
  ): Promise<ListProductDto> {
    return new ListProductDto(
      await this.productService.findProductById(productId, true),
    );
  }

  @Roles(UserTypeEnum.Admin, UserTypeEnum.Root)
  @UsePipes(ValidationPipe)
  @Put('/:productId')
  async updateProduct(
    @Body() updateProduct: UpdateProductDto,
    @Param('productId') productId: number,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(updateProduct, productId);
  }

  @Roles(UserTypeEnum.Admin, UserTypeEnum.Root)
  @Delete('/:productId')
  async deleteProduct(
    @Param('productId') productId: number,
  ): Promise<DeleteResult> {
    return this.productService.deleteProduct(productId);
  }
}
