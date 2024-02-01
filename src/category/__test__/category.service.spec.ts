import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMock } from '../__mock__/category.mock';
import { createCategoryMock } from '../__mock__/create-category.mock';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(categoryMock),
            find: jest.fn().mockResolvedValue([categoryMock]),
            save: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should return listCategory', async () => {
    const category = await categoryService.listAllCategories();

    expect(category).toEqual([categoryMock]);
  });

  it('should return error if listCategory is empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);

    expect(categoryService.listAllCategories()).rejects.toThrowError();
  });

  it('should return error in listCategory exception', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());

    expect(categoryService.listAllCategories()).rejects.toThrowError();
  });

  it('should return error if exists category name', async () => {
    expect(
      categoryService.createCategory(createCategoryMock),
    ).rejects.toThrowError();
  });

  it('should return category after save', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    const category = await categoryService.createCategory(createCategoryMock);

    expect(category).toEqual(categoryMock);
  });

  it('should return error in excpetion', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());

    expect(
      categoryService.createCategory(createCategoryMock),
    ).rejects.toThrowError();
  });

  it('should return category in listCategoryByName', async () => {
    const category = await categoryService.listCategoryByName(
      categoryMock.name,
    );

    expect(category).toEqual(categoryMock);
  });

  it('should return error if listCategoryByName is empty', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      categoryService.listCategoryByName(categoryMock.name),
    ).rejects.toThrowError();
  });
});
