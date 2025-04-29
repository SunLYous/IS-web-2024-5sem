import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Фрукты',
    description: 'Название категории (обязательно)',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
