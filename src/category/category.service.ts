import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ProductService } from '../product/product.service';
import { ListCategoryDto } from './dto/list-category.dto';
import { CountProductDto } from '../product/dto/count-product.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  findAmountCategoryInProducts(
    category: CategoryEntity,
    countList: CountProductDto[],
  ): number {
    const count = countList.find(
      (itemCount) => itemCount.category_id === category.id,
    );

    if (count) {
      return count.total;
    }

    return 0;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.listCategoryByName(
      createCategoryDto.name,
    ).catch(() => undefined);

    if (category) {
      throw new BadRequestException(
        `Category name: ${createCategoryDto.name} exists`,
      );
    }

    return this.categoryRepository.save(createCategoryDto);
  }

  async listCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category name: ${name} not found`);
    }

    return category;
  }

  async listAllCategories(): Promise<ListCategoryDto[]> {
    const categories = await this.categoryRepository.find();

    const count = await this.productService.countProductsByCategoryId();

    if (!categories || categories.length === 0) {
      throw new NotFoundException(`Categories empty`);
    }

    return categories.map(
      (category) =>
        new ListCategoryDto(
          category,
          this.findAmountCategoryInProducts(category, count),
        ),
    );
  }

  async listCategoryById(
    categoryId: number,
    isRelations?: boolean,
  ): Promise<CategoryEntity> {
    const relations = isRelations
      ? {
          products: true,
        }
      : undefined;

    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
      relations,
    });

    if (!category) {
      throw new NotFoundException(`categoryId> ${categoryId} not found`);
    }

    return category;
  }

  async deleteCategory(categoryId: number): Promise<DeleteResult> {
    const category = await this.listCategoryById(categoryId, true);

    if (Object.keys(category.products).length > 0) {
      throw new BadRequestException('Category with relations');
    }

    return this.categoryRepository.delete({ id: categoryId });
  }
}
