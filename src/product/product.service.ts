import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CountProductDto } from './dto/count-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
  ) {}

  async listAllProducts(
    productId?: number[],
    isFindRelations?: boolean,
  ): Promise<ProductEntity[]> {
    let findOptions = {};

    if (productId && productId.length > 0) {
      findOptions = {
        where: {
          id: In(productId),
        },
      };
    }

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          category: true,
        },
      };
    }

    const products = await this.productRepository.find(findOptions);

    if (!products || products.length === 0) {
      throw new NotFoundException(`Products not found`);
    }

    return products;
  }

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    await this,
      this.categoryService.listCategoryById(createProductDto.categoryId);

    return this.productRepository.save({
      ...createProductDto,
    });
  }

  async findProductById(productId: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
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
    updateProductDto: UpdateProductDto,
    productId: number,
  ): Promise<ProductEntity> {
    const product = await this.findProductById(productId);

    return this.productRepository.save({
      ...product,
      ...updateProductDto,
    });
  }

  async deleteProduct(productId: number): Promise<DeleteResult> {
    await this.findProductById(productId);

    return this.productRepository.delete({ id: productId });
  }

  async countProductsByCategoryId(): Promise<CountProductDto[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .select('product.category_id, COUNT(*) as total')
      .groupBy('product.category_id')
      .getRawMany();
  }
}
