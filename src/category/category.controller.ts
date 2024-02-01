import { Controller, Get } from '@nestjs/common';
import { ListCategoryDto } from './dto/list-category.dto';
import { CategoryService } from './category.service';
import { Roles } from 'src/decorator/role.decorator';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';

@Roles(UserTypeEnum.Admin, UserTypeEnum.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async listAllCategories(): Promise<ListCategoryDto[]> {
    return (await this.categoryService.listAllCategories()).map(
      (category) => new ListCategoryDto(category),
    );
  }
}
