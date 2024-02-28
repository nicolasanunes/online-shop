import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { categoryMock } from '../__mock__/category.mock';
import { createCategoryMock } from '../__mock__/create-category.mock';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CategoryService,
          useValue: {
            listAllCategories: jest.fn().mockResolvedValue([categoryMock]),
            createCategory: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
      controllers: [CategoryController],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should return categoryEntity in listAllCategories', async () => {
    const category = await categoryController.listAllCategories();

    expect(category).toEqual([categoryMock]);
  });

  it('should return categoryEntity in createCategory', async () => {
    const category =
      await categoryController.createCategory(createCategoryMock);

    expect(category).toEqual(categoryMock);
  });
});
