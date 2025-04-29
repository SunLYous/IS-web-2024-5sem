import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    description:
      'ID пользователя, который создает заказ (не обязательное для обновления)',
    example: 2,
    required: false,
  })
  @IsInt()
  @IsOptional()
  userId?: number;
}
