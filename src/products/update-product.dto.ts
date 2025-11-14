import { IsInt, IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateProductDto {
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
