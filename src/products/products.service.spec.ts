import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

const mockRepository = {
  find: jest.fn(),
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
});
