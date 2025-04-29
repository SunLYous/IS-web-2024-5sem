import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Апельсин' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 120 })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiPropertyOptional({
    example: 'https://storage.yandexcloud.net/azerfruits/yourimage.jpg',
  })
  @IsOptional()
  @IsString()
  image?: string;
}
