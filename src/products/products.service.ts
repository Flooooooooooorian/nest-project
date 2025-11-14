import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find();
  }

  createProduct(productCreationDto: CreateProductDto) {
    return this.productRepository.save(productCreationDto);
  }

  updateProduct(id: string, productUpdateDto: UpdateProductDto) {
    const productToUpdate = { ...productUpdateDto, id };
    return this.productRepository.save(productToUpdate);
  }

  deleteProduct(id: string) {
    return this.productRepository.delete(id);
  }
}
