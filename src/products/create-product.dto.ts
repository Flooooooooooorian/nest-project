import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  name: string;
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  price: number;
  @IsString()
  @ApiProperty()
  description: string;
  @IsInt()
  @ApiProperty()
  stock: number;
}
