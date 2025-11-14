import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import * as request from 'supertest';
import { ProductsService } from './products.service';
import { Repository } from 'typeorm';

describe('ProductsController', () => {
  let app: INestApplication;
  let productsRepository: Repository<Product>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Product],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Product]),
      ],
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    productsRepository = module.get(getRepositoryToken(Product));
  });

  afterEach(async () => {
    await productsRepository.clear();
  });

  it('GET should return list of products', async () => {
    return await request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect([]);
  });

  it('should respond with 201 and created object', async () => {
    const requestBody = {
      name: 'Sample Product',
      price: 50,
      description: 'This is a sample product',
      stock: 20,
    };
    const response = await request(app.getHttpServer())
      .post('/products')
      .send(requestBody)
      .expect(201);

    const expectedBody = {
      name: 'Sample Product',
      price: 50,
      description: 'This is a sample product',
      stock: 20,
    };

    expect(response.body.id).toBeDefined();
    expect(response.body).toMatchObject<Partial<Product>>(expectedBody);
  });

  it('should respond with 400 when requestbody is invalid', async () => {
    const requestBody = {
      name: 'Sample Product',
      price: -1,
      description: 'This is a sample product',
      stock: 20,
    };
    await request(app.getHttpServer())
      .post('/products')
      .send(requestBody)
      .expect(400)
      .expect({
        message: ['price must be a positive number'],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  it('should respond with 200 when put product', async () => {
    const requestBody = {
      name: 'Sample Product',
      price: 3,
      description: 'This is a sample product',
      stock: 20,
    };
    const updateDto = {
      name: 'Sample Update Product',
      price: 6,
      description: 'This is a updated sample product',
      stock: 15,
    };
    const response = await request(app.getHttpServer())
      .post('/products')
      .send(requestBody)
      .expect(201);

    return await request(app.getHttpServer())
      .put(`/products/${response.body.id}`)
      .send(updateDto);
  });
});
