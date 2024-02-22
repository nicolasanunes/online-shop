import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { productMock } from '../__mock__/product.mock';
import { userMock } from '../../user/__mock__/user.mock';
import { deleteProductMock } from '../__mock__/delete-product.mock';
import { createProductMock } from '../__mock__/create-product.mock';
import { updateProductMock } from '../__mock__/update-product.mock';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            listAllProducts: jest.fn().mockResolvedValue([productMock]),
            createProduct: jest.fn().mockResolvedValue(productMock),
            updateProduct: jest.fn().mockResolvedValue(productMock),
            deleteProduct: jest.fn().mockResolvedValue(deleteProductMock),
          },
        },
      ],
      controllers: [ProductController],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return productEntity in createProduct', async () => {
    const product = await productController.createProduct(createProductMock);

    expect(product).toEqual(productMock);
  });

  it('should return productEntity in listAllProducts', async () => {
    const product = await productController.listAllProducts();

    expect(product).toEqual([
      {
        id: productMock.id,
        name: productMock.name,
        price: productMock.price,
        image: productMock.image,
      },
    ]);
  });

  it('should return DeleteResult in deleteProduct', async () => {
    const product = await productController.deleteProduct(userMock.id);

    expect(product).toEqual(deleteProductMock);
  });

  it('should return productEntity in updateProduct', async () => {
    const product = await productController.updateProduct(
      updateProductMock,
      productMock.id,
    );

    expect(product).toEqual(productMock);
  });
});
