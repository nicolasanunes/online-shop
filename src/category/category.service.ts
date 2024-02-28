import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ProductService } from 'src/product/product.service';
import { ListCategoryDto } from './dto/list-category.dto';
import { CountProductDto } from 'src/product/dto/count-product.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
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

  async listCategoryById(categoryId: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException(`categoryId> ${categoryId} not found`);
    }

    return category;
  }
}
