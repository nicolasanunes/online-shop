import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRespository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async listAllProducts(): Promise<ProductEntity[]> {
    const products = await this.productRespository.find();

    if (!products || products.length === 0) {
      throw new NotFoundException(`Not found products`);
    }

    return products;
  }

  async createProduct(createProduct: CreateProductDto): Promise<ProductEntity> {
    await this, this.categoryService.listCategoryById(createProduct.categoryId);

    return this.productRespository.save({
      ...createProduct,
    });
  }
}
