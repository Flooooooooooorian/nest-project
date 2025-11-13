import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import * as request from 'supertest';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let app: INestApplication;

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
    await app.init();
  });

  it('GET should return list of products', async () => {
    return await request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect([]);
  });
});
