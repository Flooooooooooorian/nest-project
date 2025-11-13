import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private usersRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }
}
