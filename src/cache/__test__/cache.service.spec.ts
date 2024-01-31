import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { userMock } from '../../user/__mock__/user.mock';

describe('CacheService', () => {
  let cacheService: CacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => userMock,
            set: () => jest.fn(),
          },
        },
      ],
    }).compile();

    cacheService = module.get<CacheService>(CacheService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(cacheService).toBeDefined();
  });

  it('should return data in cache', async () => {
    const user = await cacheService.getCache('key', () => null);
    expect(user).toEqual(userMock);
  });

  it('should return data in function', async () => {
    const result = { test: 'test' };
    jest.spyOn(cacheManager, 'get').mockResolvedValue(undefined);

    const user = await cacheService.getCache('key', () =>
      Promise.resolve(result),
    );
    expect(user).toEqual(result);
  });
});
