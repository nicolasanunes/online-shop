import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDto } from './dto/update-product.dto';

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
      throw new NotFoundException(`Products not found`);
    }

    return products;
  }

  async createProduct(createProduct: CreateProductDto): Promise<ProductEntity> {
    await this, this.categoryService.listCategoryById(createProduct.categoryId);

    return this.productRespository.save({
      ...createProduct,
    });
  }

  async findProductById(productId: number): Promise<ProductEntity> {
    const product = await this.productRespository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException(`productId: ${productId} not found`);
    }

    return product;
  }

  async updateProduct(
    updateProduct: UpdateProductDto,
    productId: number,
  ): Promise<ProductEntity> {
    const product = await this.findProductById(productId);

    return this.productRespository.save({
      ...product,
      ...updateProduct,
    });
  }

  async deleteProduct(productId: number): Promise<DeleteResult> {
    await this.findProductById(productId);

    return this.productRespository.delete({ id: productId });
  }
}
