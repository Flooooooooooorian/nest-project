import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getAllProducts() {
    return this.productsService.findAll();
  }

  @Post()
  postProduct(@Body() productCreationDto: CreateProductDto) {
    return this.productsService.createProduct(productCreationDto);
  }
}
