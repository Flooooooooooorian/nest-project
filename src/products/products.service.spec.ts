import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

const mockRepository = {
  find: jest.fn(),
  save: jest.fn(),
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: 'ProductRepository', useValue: mockRepository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return Promise<Product[]> when find is called', async () => {
    mockRepository.find.mockReturnValue([]);

    expect(await service.findAll()).toEqual([]);
  });

  it('should return Promise<Product> when create is called', async () => {
    const createProductDto = {
      name: 'Test Product',
      price: 100,
      description: 'A product for testing',
      stock: 10,
    };
    const expectedResult = {
      id: '1',
      name: 'Test Product',
      price: 100,
      description: 'A product for testing',
      stock: 10,
    };

    mockRepository.save.mockReturnValue(expectedResult);

    expect(await service.createProduct(createProductDto)).toEqual(
      expectedResult,
    );
  });

  it('should return Promise<Product> when update is called', async () => {
    const id = '1';
    const createProductDto = {
      name: 'Test Product',
      price: 100,
      description: 'A product for testing',
      stock: 10,
    };
    const expectedResult = {
      id: '1',
      name: 'Test Product',
      price: 100,
      description: 'A product for testing',
      stock: 10,
    };

    mockRepository.save.mockReturnValue(expectedResult);

    expect(await service.updateProduct(id, createProductDto)).toEqual(
      expectedResult,
    );
  });
});
