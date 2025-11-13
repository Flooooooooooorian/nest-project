import { IsInt, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsNumber()
  @IsPositive()
  price: number;
  @IsString()
  description: string;
  @IsInt()
  stock: number;
}
