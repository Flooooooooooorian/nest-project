import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

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

  @Put(':id')
  putProduct(
    @Param('id') id: string,
    @Body() productUpdateDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, productUpdateDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
