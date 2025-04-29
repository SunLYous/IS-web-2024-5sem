import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Яблоко' })
  @IsString()
  name: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  categoryId: number;

  @ApiPropertyOptional({
    example: 'https://storage.yandexcloud.net/azerfruits/yourimage.jpg',
  })
  @IsOptional()
  @IsString()
  image?: string;
}
