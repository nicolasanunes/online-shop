import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRespository: Repository<ProductEntity>,
  ) {}

  async listAllProducts(): Promise<ProductEntity[]> {
    const products = await this.productRespository.find();

    if (!products || products.length === 0) {
      throw new NotFoundException(`Not found products`);
    }

    return products;
  }
}
