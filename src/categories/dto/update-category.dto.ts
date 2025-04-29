import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    example: 'Овощи',
    description: 'Новое название категории (необязательно)',
  })
  @IsString()
  @IsOptional()
  name?: string;
}
