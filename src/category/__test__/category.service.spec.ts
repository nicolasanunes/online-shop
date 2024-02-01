import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMock } from '../__mock__/category.mock';

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
});
