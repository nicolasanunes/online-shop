import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ListCategoryDto } from './dto/list-category.dto';
import { CategoryService } from './category.service';
import { Roles } from 'src/decorator/role.decorator';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Roles(UserTypeEnum.Admin, UserTypeEnum.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }

  @Get()
  async listAllCategories(): Promise<ListCategoryDto[]> {
    return (await this.categoryService.listAllCategories()).map(
      (category) => new ListCategoryDto(category),
    );
  }
}
