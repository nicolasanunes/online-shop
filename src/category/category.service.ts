import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

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

  async listAllCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find();

    if (!categories || categories.length === 0) {
      throw new NotFoundException(`Categories empty`);
    }

    return categories;
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
