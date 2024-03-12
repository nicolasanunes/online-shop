import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ListCategoryDto } from './dto/list-category.dto';
import { CategoryService } from './category.service';
import { Roles } from '../decorator/role.decorator';
import { UserTypeEnum } from '../user/enum/user-type.enum';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteResult } from 'typeorm';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(UserTypeEnum.Admin, UserTypeEnum.Root)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }

  @Roles(UserTypeEnum.Admin, UserTypeEnum.Root, UserTypeEnum.User)
  @Get()
  async listAllCategories(): Promise<ListCategoryDto[]> {
    return this.categoryService.listAllCategories();
  }

  @Roles(UserTypeEnum.Admin, UserTypeEnum.Root)
  @Delete(':categoryId')
  async deleteCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<DeleteResult> {
    return this.categoryService.deleteCategory(categoryId);
  }
}
